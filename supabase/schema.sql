-- ============================================================================
-- Кыргызча — Supabase schema
-- Run this once in Supabase → SQL Editor → New query → paste → Run.
-- Safe to run again: it only creates what's missing and refreshes functions.
--
-- Security model: the browser never talks to Supabase directly. Only the app's
-- server functions do, using the secret / service-role key. Row Level Security
-- is ON with no policies, and anon/authenticated roles get no access at all.
-- ============================================================================

create table if not exists kg_users (
  id          text primary key,
  email       text not null unique,
  name        text not null,
  salt        text not null,
  hash        text not null,
  native      boolean not null default false,
  board       boolean not null default true,
  ver         integer not null default 0,
  unread      integer not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists kg_progress (
  user_id     text primary key references kg_users(id) on delete cascade,
  state       jsonb not null,
  updated_at  timestamptz not null default now()
);

create table if not exists kg_texts (
  user_id     text not null references kg_users(id) on delete cascade,
  id          text not null,
  title       text not null,
  level       text not null default '',
  source      text not null default '',
  body        text not null,
  created_at  timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists kg_posts (
  id          text primary key,
  user_id     text not null references kg_users(id) on delete cascade,
  name        text not null,
  native      boolean not null default false,
  prompt      text not null default '',
  level       text not null default '',
  body        text not null,
  nc          integer not null default 0,
  reports     integer not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists kg_posts_recent on kg_posts (created_at desc);
create index if not exists kg_posts_user on kg_posts (user_id, created_at desc);

create table if not exists kg_corrections (
  id          text primary key,
  post_id     text not null references kg_posts(id) on delete cascade,
  user_id     text not null references kg_users(id) on delete cascade,
  name        text not null,
  native      boolean not null default false,
  body        text not null default '',
  comment     text not null default '',
  helpful     integer not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists kg_corrections_post on kg_corrections (post_id, created_at);

create table if not exists kg_flags (
  post_id     text not null references kg_posts(id) on delete cascade,
  user_id     text not null references kg_users(id) on delete cascade,
  kind        text not null,            -- 'report' or 'helpful:<correction id>'
  primary key (post_id, user_id, kind)
);

create table if not exists kg_xp (
  week        text not null,             -- ISO week, e.g. 2026-W47
  user_id     text not null references kg_users(id) on delete cascade,
  name        text not null,
  xp          integer not null default 0,
  primary key (week, user_id)
);
create index if not exists kg_xp_rank on kg_xp (week, xp desc);

create table if not exists kg_limits (
  key         text primary key,
  n           integer not null,
  reset_at    timestamptz not null
);

-- Lock everything down: only the server (service role) may touch these tables.
do $$ declare t text; begin
  foreach t in array array['kg_users','kg_progress','kg_texts','kg_posts','kg_corrections','kg_flags','kg_xp','kg_limits'] loop
    execute format('alter table %I enable row level security', t);
    execute format('revoke all on %I from public', t);
    if exists (select 1 from pg_roles where rolname = 'anon') then execute format('revoke all on %I from anon', t); end if;
    if exists (select 1 from pg_roles where rolname = 'authenticated') then execute format('revoke all on %I from authenticated', t); end if;
    if exists (select 1 from pg_roles where rolname = 'service_role') then execute format('grant all on %I to service_role', t); end if;
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function kg_user_json(u kg_users) returns jsonb language sql immutable as $$
  select jsonb_build_object('id', u.id, 'email', u.email, 'name', u.name, 'salt', u.salt, 'hash', u.hash,
    'native', u.native, 'board', u.board, 'ver', u.ver, 'unread', u.unread,
    'created', (extract(epoch from u.created_at) * 1000)::bigint)
$$;
create or replace function kg_ms(t timestamptz) returns bigint language sql immutable as $$ select (extract(epoch from t) * 1000)::bigint $$;
create or replace function kg_ts(ms jsonb) returns timestamptz language sql immutable as $$
  select case when ms is null or ms = 'null'::jsonb then now() else to_timestamp((ms #>> '{}')::double precision / 1000) end
$$;

-- Every API function below takes one jsonb argument `p` and returns jsonb.

-- Rate limiting: fixed window counter.
create or replace function kg_limit(p jsonb) returns jsonb language plpgsql as $$
declare v integer;
begin
  insert into kg_limits as l (key, n, reset_at)
  values (p->>'key', 1, now() + make_interval(secs => (p->>'window')::int))
  on conflict (key) do update set
    n = case when l.reset_at < now() then 1 else l.n + 1 end,
    reset_at = case when l.reset_at < now() then now() + make_interval(secs => (p->>'window')::int) else l.reset_at end
  returning n into v;
  if random() < 0.01 then delete from kg_limits where reset_at < now() - interval '1 day'; end if;
  return jsonb_build_object('n', v);
end $$;

-- ------------------------------- Users -------------------------------------
create or replace function kg_signup(p jsonb) returns jsonb language plpgsql as $$
declare u kg_users;
begin
  insert into kg_users (id, email, name, salt, hash, native)
  values (p->>'id', lower(p->>'email'), p->>'name', p->>'salt', p->>'hash', coalesce((p->>'native')::boolean, false))
  returning * into u;
  return jsonb_build_object('user', kg_user_json(u));
exception when unique_violation then
  return jsonb_build_object('error', 'exists');
end $$;

create or replace function kg_user_by_email(p jsonb) returns jsonb language sql as $$
  select coalesce((select kg_user_json(u) from kg_users u where u.email = lower(p->>'email')), 'null'::jsonb)
$$;

create or replace function kg_user(p jsonb) returns jsonb language sql as $$
  select coalesce((select kg_user_json(u) from kg_users u where u.id = p->>'id'), 'null'::jsonb)
$$;

create or replace function kg_update_user(p jsonb) returns jsonb language plpgsql as $$
declare u kg_users;
begin
  update kg_users set
    name   = coalesce(p->>'name', name),
    native = coalesce((p->>'native')::boolean, native),
    board  = coalesce((p->>'board')::boolean, board),
    salt   = coalesce(p->>'salt', salt),
    hash   = coalesce(p->>'hash', hash),
    ver    = coalesce((p->>'ver')::int, ver)
  where id = p->>'id' returning * into u;
  if u.id is null then return 'null'::jsonb; end if;
  -- keep the display name on posts and the league in sync
  if p ? 'name' then
    update kg_posts set name = u.name where user_id = u.id;
    update kg_corrections set name = u.name where user_id = u.id;
    update kg_xp set name = u.name where user_id = u.id;
  end if;
  if p ? 'native' then
    update kg_posts set native = u.native where user_id = u.id;
    update kg_corrections set native = u.native where user_id = u.id;
  end if;
  return kg_user_json(u);
end $$;

-- Deletes the account and, through ON DELETE CASCADE, all of its data.
create or replace function kg_delete_user(p jsonb) returns jsonb language sql as $$
  with d as (delete from kg_users where id = p->>'id' returning 1) select jsonb_build_object('deleted', (select count(*) from d))
$$;

-- ------------------------------ Progress -----------------------------------
create or replace function kg_get_state(p jsonb) returns jsonb language sql as $$
  select coalesce((select jsonb_build_object('state', state, 'updatedAt', kg_ms(updated_at)) from kg_progress where user_id = p->>'uid'),
                  jsonb_build_object('state', null, 'updatedAt', 0))
$$;

create or replace function kg_put_state(p jsonb) returns jsonb language plpgsql as $$
declare t timestamptz;
begin
  insert into kg_progress (user_id, state, updated_at) values (p->>'uid', p->'state', now())
  on conflict (user_id) do update set state = excluded.state, updated_at = now()
  returning updated_at into t;
  return jsonb_build_object('updatedAt', kg_ms(t));
end $$;

-- ------------------------------- Texts -------------------------------------
create or replace function kg_text_meta(t kg_texts) returns jsonb language sql immutable as $$
  select jsonb_build_object('id', t.id, 'title', t.title, 'level', t.level, 'source', t.source, 'created', kg_ms(t.created_at), 'len', length(t.body))
$$;

create or replace function kg_texts(p jsonb) returns jsonb language sql as $$
  select coalesce(jsonb_agg(kg_text_meta(t) order by t.created_at desc), '[]'::jsonb) from kg_texts t where t.user_id = p->>'uid'
$$;

create or replace function kg_text(p jsonb) returns jsonb language sql as $$
  select coalesce((select kg_text_meta(t) || jsonb_build_object('text', t.body) from kg_texts t where t.user_id = p->>'uid' and t.id = p->>'id'), 'null'::jsonb)
$$;

create or replace function kg_put_text(p jsonb) returns jsonb language plpgsql as $$
declare t kg_texts;
begin
  if not exists (select 1 from kg_texts where user_id = p->>'uid' and id = p->>'id')
     and (select count(*) from kg_texts where user_id = p->>'uid') >= coalesce((p->>'max')::int, 150) then
    return jsonb_build_object('error', 'full');
  end if;
  insert into kg_texts (user_id, id, title, level, source, body, created_at)
  values (p->>'uid', p->>'id', p->>'title', coalesce(p->>'level', ''), coalesce(p->>'source', ''), p->>'text', kg_ts(p->'created'))
  on conflict (user_id, id) do update set title = excluded.title, level = excluded.level, source = excluded.source, body = excluded.body
  returning * into t;
  return kg_text_meta(t);
end $$;

create or replace function kg_delete_text(p jsonb) returns jsonb language sql as $$
  with d as (delete from kg_texts where user_id = p->>'uid' and id = p->>'id' returning 1) select jsonb_build_object('deleted', (select count(*) from d))
$$;

-- ----------------------------- Community -----------------------------------
create or replace function kg_post_json(x kg_posts) returns jsonb language sql immutable as $$
  select jsonb_build_object('id', x.id, 'uid', x.user_id, 'name', x.name, 'native', x.native, 'prompt', x.prompt, 'level', x.level,
    'text', x.body, 'nc', x.nc, 'created', kg_ms(x.created_at))
$$;

create or replace function kg_feed(p jsonb) returns jsonb language sql as $$
  select coalesce(jsonb_agg(kg_post_json(x) order by x.created_at desc), '[]'::jsonb) from (
    select * from kg_posts where reports < 3 and (p->>'prompt' is null or prompt = p->>'prompt')
    order by created_at desc limit least(coalesce((p->>'limit')::int, 50), 100)) x
$$;

create or replace function kg_post(p jsonb) returns jsonb language sql as $$
  select case when x.id is null then 'null'::jsonb else jsonb_build_object(
    'post', kg_post_json(x),
    'corrections', coalesce((select jsonb_agg(jsonb_build_object('id', c.id, 'uid', c.user_id, 'name', c.name, 'native', c.native, 'text', c.body,
        'comment', c.comment, 'helpful', c.helpful, 'created', kg_ms(c.created_at)) order by c.created_at) from kg_corrections c where c.post_id = x.id), '[]'::jsonb))
  end from (select * from kg_posts where id = p->>'id' and reports < 3) x right join (select 1) one on true
$$;

create or replace function kg_my_posts(p jsonb) returns jsonb language sql as $$
  select jsonb_build_object(
    'posts', coalesce((select jsonb_agg(kg_post_json(x) order by x.created_at desc) from (select * from kg_posts where user_id = p->>'uid' order by created_at desc limit 50) x), '[]'::jsonb),
    'unread', coalesce((select unread from kg_users where id = p->>'uid'), 0))
$$;

create or replace function kg_create_post(p jsonb) returns jsonb language plpgsql as $$
declare x kg_posts;
begin
  insert into kg_posts (id, user_id, name, native, prompt, level, body)
  select p->>'id', u.id, u.name, u.native, coalesce(p->>'prompt', ''), coalesce(p->>'level', ''), p->>'text' from kg_users u where u.id = p->>'uid'
  returning * into x;
  return kg_post_json(x);
end $$;

create or replace function kg_add_correction(p jsonb) returns jsonb language plpgsql as $$
declare author text;
begin
  select user_id into author from kg_posts where id = p->>'post_id' and reports < 3;
  if author is null then return jsonb_build_object('error', 'not_found'); end if;
  insert into kg_corrections (id, post_id, user_id, name, native, body, comment)
  select p->>'id', p->>'post_id', u.id, u.name, u.native, coalesce(p->>'text', ''), coalesce(p->>'comment', '') from kg_users u where u.id = p->>'uid';
  update kg_posts set nc = nc + 1 where id = p->>'post_id';
  if author <> p->>'uid' then update kg_users set unread = unread + 1 where id = author; end if;
  return jsonb_build_object('ok', true, 'id', p->>'id');
end $$;

create or replace function kg_helpful(p jsonb) returns jsonb language plpgsql as $$
declare n integer;
begin
  if not exists (select 1 from kg_posts where id = p->>'post_id' and user_id = p->>'uid') then return jsonb_build_object('error', 'forbidden'); end if;
  insert into kg_flags (post_id, user_id, kind) values (p->>'post_id', p->>'uid', 'helpful:' || (p->>'cid')) on conflict do nothing;
  get diagnostics n = row_count;
  if n > 0 then update kg_corrections set helpful = helpful + 1 where id = p->>'cid' and post_id = p->>'post_id'; end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function kg_report(p jsonb) returns jsonb language plpgsql as $$
declare n integer;
begin
  insert into kg_flags (post_id, user_id, kind) select id, p->>'uid', 'report' from kg_posts where id = p->>'post_id' on conflict do nothing;
  get diagnostics n = row_count;
  if n > 0 then update kg_posts set reports = reports + 1 where id = p->>'post_id'; end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function kg_delete_post(p jsonb) returns jsonb language plpgsql as $$
declare n integer;
begin
  delete from kg_posts where id = p->>'post_id' and user_id = p->>'uid';
  get diagnostics n = row_count;
  return case when n > 0 then jsonb_build_object('ok', true) else jsonb_build_object('error', 'forbidden') end;
end $$;

create or replace function kg_seen(p jsonb) returns jsonb language sql as $$
  with u as (update kg_users set unread = 0 where id = p->>'uid' returning 1) select jsonb_build_object('ok', true)
$$;

-- ------------------------------- League ------------------------------------
create or replace function kg_add_xp(p jsonb) returns jsonb language plpgsql as $$
begin
  insert into kg_xp as x (week, user_id, name, xp)
  select p->>'week', u.id, u.name, (p->>'xp')::int from kg_users u where u.id = p->>'uid' and u.board
  on conflict (week, user_id) do update set xp = x.xp + excluded.xp, name = excluded.name;
  if random() < 0.01 then delete from kg_xp where week < to_char(now() - interval '35 days', 'IYYY-"W"IW'); end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function kg_board(p jsonb) returns jsonb language sql as $$
  select coalesce(jsonb_agg(jsonb_build_object('uid', x.user_id, 'name', x.name, 'xp', x.xp) order by x.xp desc), '[]'::jsonb)
  from (select x.* from kg_xp x join kg_users u on u.id = x.user_id and u.board
        where x.week = p->>'week' order by x.xp desc limit least(coalesce((p->>'limit')::int, 25), 100)) x
$$;

-- Only the server may call these functions.
do $$ declare f record; begin
  for f in select p.oid::regprocedure as sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace
           where n.nspname = 'public' and p.proname like 'kg\_%' loop
    execute format('alter function %s set search_path = public, pg_temp', f.sig);
    execute format('revoke all on function %s from public', f.sig);
    if exists (select 1 from pg_roles where rolname = 'anon') then execute format('revoke all on function %s from anon', f.sig); end if;
    if exists (select 1 from pg_roles where rolname = 'authenticated') then execute format('revoke all on function %s from authenticated', f.sig); end if;
    if exists (select 1 from pg_roles where rolname = 'service_role') then execute format('grant execute on function %s to service_role', f.sig); end if;
  end loop;
end $$;

-- Tell the Supabase API about the new functions right away.
notify pgrst, 'reload schema';
