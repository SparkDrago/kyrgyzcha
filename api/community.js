/* /api/community — Busuu-style writing exercises corrected by other learners and native speakers.
   GET  ?a=feed[&prompt=]      recent posts
   GET  ?a=post&id=            one post with its corrections
   GET  ?a=mine                my posts + unread corrections count
   POST ?a=post {prompt,level,text}
   POST ?a=correct {id,text,comment}
   POST ?a=helpful {id,cid}
   POST ?a=report {id}
   POST ?a=delete {id}
   POST ?a=seen                mark my inbox read */
'use strict';
const C = require('./_lib/core');

const shortPost = (p) => p && ({ id: p.id, name: p.name, native: p.native, prompt: p.prompt, level: p.level, text: p.text, created: p.created, nc: p.nc || 0, mine: false });

async function loadPosts(ids) {
  if (!ids.length) return [];
  const raw = await C.cmd('MGET', ...ids.map((i) => 'post:' + i));
  return raw.map((r) => (r ? JSON.parse(r) : null)).filter((p) => p && (p.reports || 0) < 3);
}

module.exports = C.handler(async (req, res, q) => {
  const a = q.a || 'feed';
  const me = await C.currentUser(req);

  if (req.method === 'GET') {
    await C.limit('cget:' + C.ip(req), 120, 60);
    if (a === 'feed') {
      const ids = await C.cmd('LRANGE', 'posts:recent', 0, 79);
      let posts = await loadPosts(ids);
      if (q.prompt) posts = posts.filter((p) => p.prompt === q.prompt);
      return C.send(res, 200, { posts: posts.slice(0, 50).map((p) => Object.assign(shortPost(p), { mine: !!me && p.uid === me.id })) });
    }
    if (a === 'post') {
      const p = await C.getJSON('post:' + C.safeId(q.id));
      if (!p) throw new C.HttpError(404, 'Post not found');
      const cs = (await C.cmd('LRANGE', `post:${p.id}:c`, 0, 99)).map((x) => JSON.parse(x)).reverse();
      return C.send(res, 200, { post: Object.assign(shortPost(p), { mine: !!me && p.uid === me.id }), corrections: cs.map((c) => ({ id: c.id, name: c.name, native: c.native, text: c.text, comment: c.comment, created: c.created, helpful: c.helpful || 0, mine: !!me && c.uid === me.id })) });
    }
    if (a === 'mine') {
      if (!me) return C.send(res, 200, { posts: [], unread: 0 });
      const ids = await C.cmd('LRANGE', 'posts:user:' + me.id, 0, 49);
      const posts = (await loadPosts(ids)).map((p) => Object.assign(shortPost(p), { mine: true }));
      const unread = Number(await C.cmd('GET', 'inbox:' + me.id)) || 0;
      return C.send(res, 200, { posts, unread });
    }
    throw new C.HttpError(404, 'Unknown action');
  }

  if (req.method !== 'POST') throw new C.HttpError(405, 'Method not allowed');
  const user = await C.requireUser(req);
  const b = await C.body(req);

  if (a === 'post') {
    await C.limit('post:' + user.id, 20, 86400);
    const text = C.clean(b.text, 2001);
    if (text.length < 3) throw new C.HttpError(400, 'Write a few words first.');
    if (text.length > 2000) throw new C.HttpError(400, 'Keep it under 2,000 characters.');
    const p = { id: C.id(8), uid: user.id, name: user.name, native: !!user.native, prompt: C.clean(b.prompt, 60), level: C.clean(b.level, 10), text, created: Date.now(), nc: 0, reports: 0 };
    await C.pipe([['SET', 'post:' + p.id, JSON.stringify(p)], ['LPUSH', 'posts:recent', p.id], ['LTRIM', 'posts:recent', 0, 499], ['LPUSH', 'posts:user:' + user.id, p.id], ['LTRIM', 'posts:user:' + user.id, 0, 199]]);
    return C.send(res, 200, { post: Object.assign(shortPost(p), { mine: true }) });
  }

  const pid = C.safeId(b.id);
  const p = await C.getJSON('post:' + pid);
  if (!p) throw new C.HttpError(404, 'Post not found');

  if (a === 'correct') {
    await C.limit('correct:' + user.id, 80, 86400);
    const text = C.clean(b.text, 2001), comment = C.clean(b.comment, 600);
    if (!text && !comment) throw new C.HttpError(400, 'Write a correction or a comment.');
    if (text.length > 2000) throw new C.HttpError(400, 'Correction is too long.');
    const c = { id: C.id(6), uid: user.id, name: user.name, native: !!user.native, text, comment, created: Date.now(), helpful: 0 };
    p.nc = (p.nc || 0) + 1;
    const ops = [['LPUSH', `post:${p.id}:c`, JSON.stringify(c)], ['LTRIM', `post:${p.id}:c`, 0, 99], ['SET', 'post:' + p.id, JSON.stringify(p)]];
    if (p.uid !== user.id) ops.push(['INCR', 'inbox:' + p.uid]);
    await C.pipe(ops);
    return C.send(res, 200, { ok: true, id: c.id });
  }

  if (a === 'helpful') {
    const cid = C.safeId(b.cid);
    if (p.uid !== user.id) throw new C.HttpError(403, 'Only the author can mark corrections as helpful.');
    const first = await C.cmd('SET', `helpful:${cid}:${user.id}`, '1', 'NX');
    if (!first) return C.send(res, 200, { ok: true });
    const list = (await C.cmd('LRANGE', `post:${p.id}:c`, 0, 99)).map((x) => JSON.parse(x));
    const updated = list.map((c) => (c.id === cid ? Object.assign(c, { helpful: (c.helpful || 0) + 1 }) : c));
    await C.pipe([['DEL', `post:${p.id}:c`], ...(updated.length ? [['LPUSH', `post:${p.id}:c`, ...updated.reverse().map((c) => JSON.stringify(c))]] : [])]);
    return C.send(res, 200, { ok: true });
  }

  if (a === 'report') {
    const first = await C.cmd('SET', `report:${p.id}:${user.id}`, '1', 'NX');
    if (first) { p.reports = (p.reports || 0) + 1; await C.setJSON('post:' + p.id, p); }
    return C.send(res, 200, { ok: true });
  }

  if (a === 'delete') {
    if (p.uid !== user.id) throw new C.HttpError(403, 'You can only delete your own posts.');
    await C.pipe([['DEL', 'post:' + p.id, `post:${p.id}:c`], ['LREM', 'posts:recent', 0, p.id], ['LREM', 'posts:user:' + user.id, 0, p.id]]);
    return C.send(res, 200, { ok: true });
  }

  if (a === 'seen') { await C.cmd('DEL', 'inbox:' + user.id); return C.send(res, 200, { ok: true }); }

  throw new C.HttpError(404, 'Unknown action');
});
