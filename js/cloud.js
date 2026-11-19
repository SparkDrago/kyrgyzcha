/* ==========================================================================
   Cloud: accounts, cross-device sync, weekly league XP, installable app (PWA).
   Works in "guest mode" with no server (local file, preview, offline):
   everything is saved on the device and merged into the account on sign-in.
   ========================================================================== */
(window.KG_PLUGINS = window.KG_PLUGINS || []).push(function (A) {
  'use strict';
  const { store, $, esc, toast } = A;
  const cloud = { available: null, user: null, status: 'idle', lastSync: 0, listeners: [] };
  A.cloud = cloud;
  const emit = () => cloud.listeners.forEach((fn) => { try { fn(cloud); } catch (e) { /* ignore */ } });
  cloud.onChange = (fn) => cloud.listeners.push(fn);

  /* ------------------------------ API client ------------------------------ */
  async function api(path, opts) {
    opts = opts || {};
    const r = await fetch(path, {
      method: opts.method || 'GET', credentials: 'same-origin',
      headers: Object.assign({ 'X-KG': '1' }, opts.body ? { 'Content-Type': 'application/json' } : {}),
      body: opts.body ? JSON.stringify(opts.body) : undefined, keepalive: !!opts.keepalive
    });
    let j = null;
    try { j = await r.json(); } catch (e) { throw Object.assign(new Error('The server isn’t reachable.'), { offline: true }); }
    if (!r.ok) throw Object.assign(new Error(j.error || 'Something went wrong.'), { status: r.status });
    return j;
  }
  cloud.api = api;

  /* --------------------------------- Merge -------------------------------- */
  // Combine progress from this device and the account so nothing is lost.
  function merge(a, b) {
    if (!b) return a; if (!a) return b;
    const out = Object.assign({}, b, a);
    const newer = (a.mod || 0) >= (b.mod || 0) ? a : b;
    ['plan', 'placement', 'settings', 'tl', 'ar'].forEach((k) => { if (newer[k] !== undefined) out[k] = newer[k]; });
    const maxMap = (x, y) => { const o = Object.assign({}, y || {}); Object.entries(x || {}).forEach(([k, v]) => { o[k] = Math.max(v || 0, o[k] || 0); }); return o; };
    const byTime = (x, y) => { const o = Object.assign({}, y || {}); Object.entries(x || {}).forEach(([k, v]) => { const w = o[k]; if (!w || (v.t || 0) > (w.t || 0) || (!v.t && !w.t && (v.box || v.s || 0) > (w.box || w.s || 0))) o[k] = v; }); return o; };
    out.done = maxMap(a.done, b.done);
    out.xp = maxMap(a.xp, b.xp);
    out.stats = maxMap(a.stats, b.stats);
    out.srs = byTime(a.srs, b.srs);
    out.words = byTime(a.words, b.words);
    out.certs = Object.assign({}, b.certs || {});
    Object.entries(a.certs || {}).forEach(([k, v]) => { if (!out.certs[k] || v.score > out.certs[k].score) out.certs[k] = v; });
    const seen = new Set(); out.mistakes = [...(a.mistakes || []), ...(b.mistakes || [])].filter((m) => { const k = m.q; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 200);
    const sa = a.streak || {}, sb = b.streak || {};
    out.streak = (sa.last || '') > (sb.last || '') ? sa : (sb.last || '') > (sa.last || '') ? sb : { last: sa.last || '', count: Math.max(sa.count || 0, sb.count || 0) };
    out.reviews = Math.max(a.reviews || 0, b.reviews || 0);
    out.localTexts = a.localTexts || b.localTexts;
    out.mod = Math.max(a.mod || 0, b.mod || 0);
    return out;
  }
  cloud.merge = merge;

  /* --------------------------------- Sync --------------------------------- */
  let timer = null, pushing = false, again = false;
  function payload() { const d = Object.assign({}, store.d); delete d.localTexts; return d; }
  async function pull() {
    cloud.status = 'syncing'; emit();
    const r = await api('/api/state');
    const merged = merge(store.d, r.state);
    store.d = Object.assign(store.d, merged);
    store.save(true);
    await push();
    A.applyTl(); A.applyAr();
  }
  async function push() {
    if (!cloud.user) return;
    if (pushing) { again = true; return; }
    pushing = true; cloud.status = 'syncing'; emit();
    try { await api('/api/state', { method: 'PUT', body: { state: payload() } }); cloud.status = 'synced'; cloud.lastSync = Date.now(); }
    catch (e) { cloud.status = e.offline ? 'offline' : 'error'; cloud.error = e.message; }
    pushing = false; emit();
    if (again) { again = false; push(); }
  }
  cloud.syncNow = async () => { if (cloud.user) { try { await pull(); toast('Progress synced.'); } catch (e) { toast(e.message); } } };
  document.addEventListener('kg-save', () => { if (!cloud.user) return; clearTimeout(timer); timer = setTimeout(push, 2500); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && cloud.user && timer) { clearTimeout(timer); timer = null; api('/api/state', { method: 'PUT', body: { state: payload() }, keepalive: true }).catch(() => {}); }
    if (document.visibilityState === 'visible' && cloud.user && Date.now() - cloud.lastSync > 60000) pull().catch(() => {});
  });

  // Weekly league: send earned XP in small batches.
  let pendingXP = 0, xpTimer = null;
  document.addEventListener('kg-xp', (e) => {
    pendingXP += e.detail.n;
    if (!cloud.user) return;
    clearTimeout(xpTimer);
    xpTimer = setTimeout(() => { const n = Math.min(150, pendingXP); pendingXP -= n; api('/api/leaderboard', { method: 'POST', body: { xp: n } }).catch(() => { pendingXP += n; }); }, 4000);
  });

  async function signedIn(user, fresh) {
    cloud.user = user; emit(); renderButton();
    try { await pull(); if (fresh) toast('Signed in. Progress from this device was added to your account.'); }
    catch (e) { cloud.status = 'error'; cloud.error = e.message; emit(); }
    document.dispatchEvent(new CustomEvent('kg-auth', { detail: user }));
  }

  /* ------------------------------ Header button --------------------------- */
  function renderButton() {
    const b = $('.acct-btn'); if (!b) return;
    if (cloud.user) { b.textContent = cloud.user.name.slice(0, 18); b.title = 'Your account (' + cloud.user.email + ')'; b.classList.add('in'); }
    else { b.textContent = cloud.available === false ? 'Guest' : 'Sign in'; b.title = 'Sign in to sync your progress'; b.classList.remove('in'); }
  }

  /* ------------------------------ Account page ---------------------------- */
  const ago = (t) => { if (!t) return 'never'; const s = Math.round((Date.now() - t) / 1000); return s < 60 ? 'just now' : s < 3600 ? Math.round(s / 60) + ' min ago' : new Date(t).toLocaleString(); };
  A.ROUTES.account = function account() {
    const main = A.main();
    const head = `<header class="page-head"><div class="wrap"><h1>Your account</h1><div class="kgt">Аккаунт</div><p>Sign in to keep your progress safe and continue on any device — phone, tablet or computer.</p></div></header>`;
    if (cloud.available === false) {
      main.innerHTML = head + `<div class="narrow" style="padding:36px 0 80px">${cloud.serverError ? A.BLOCK.warn({ title: 'The server needs setting up', html: esc(cloud.serverError) }) : ''}${A.BLOCK.tip({ title: 'Guest mode', html: 'This copy of the app is running without its server — for example as a preview or straight from a file — so accounts, sync and the community are switched off. Everything you do is still saved on this device.<br><br>Once it’s deployed on Vercel with a database (see the README), this page lets you create an account.' })}${installBlock()}</div>`;
      return;
    }
    if (!cloud.user) {
      main.innerHTML = head + `<div class="narrow" style="padding:36px 0 80px"><div class="auth-card panel">
        <div class="seg" role="tablist" style="margin-bottom:18px"><button data-tab="in" aria-pressed="true">Sign in</button><button data-tab="up" aria-pressed="false">Create account</button></div>
        <form class="auth-form" novalidate>
          <div class="field up-only hide"><label for="au-name">Your name (shown in the community)</label><input id="au-name" type="text" autocomplete="nickname" maxlength="40" style="font-family:var(--f-ui);font-size:1rem"></div>
          <div class="field"><label for="au-email">Email</label><input id="au-email" type="email" autocomplete="email" required style="font-family:var(--f-ui);font-size:1rem"></div>
          <div class="field"><label for="au-pw">Password</label><input id="au-pw" type="password" autocomplete="current-password" minlength="8" required style="font-family:var(--f-ui);font-size:1rem"><div class="preview up-only hide">At least 8 characters.</div></div>
          <label class="check up-only hide"><input id="au-native" type="checkbox"> I’m a native or fluent Kyrgyz speaker (you’ll get a badge when correcting others)</label>
          <div class="form-msg" role="alert"></div>
          <button class="btn btn-ink" type="submit">Sign in</button>
        </form>
        <p class="voice-note" style="margin-top:16px">Your progress on this device is added to your account when you sign in. Forgot your password? This app doesn’t send emails, so create a new account — or ask the site owner to reset it.</p>
      </div>${installBlock()}</div>`;
      let mode = 'in';
      const form = $('.auth-form', main);
      main.addEventListener('click', (e) => {
        const t = e.target.closest('[data-tab]'); if (!t) return;
        mode = t.dataset.tab;
        main.querySelectorAll('[data-tab]').forEach((x) => x.setAttribute('aria-pressed', String(x === t)));
        main.querySelectorAll('.up-only').forEach((x) => x.classList.toggle('hide', mode !== 'up'));
        $('#au-pw').setAttribute('autocomplete', mode === 'up' ? 'new-password' : 'current-password');
        form.querySelector('[type=submit]').textContent = mode === 'up' ? 'Create account' : 'Sign in';
      });
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = $('.form-msg', main), btn = form.querySelector('[type=submit]');
        msg.textContent = ''; btn.disabled = true;
        try {
          const body = { email: $('#au-email').value, password: $('#au-pw').value };
          if (mode === 'up') Object.assign(body, { name: $('#au-name').value, native: $('#au-native').checked });
          const r = await api('/api/auth?a=' + (mode === 'up' ? 'signup' : 'login'), { method: 'POST', body });
          await signedIn(r.user, true);
          location.hash = '#home';
        } catch (err) { msg.textContent = err.message; btn.disabled = false; }
      });
      return;
    }
    const u = cloud.user;
    const statusText = { idle: 'Ready', syncing: 'Syncing…', synced: 'Up to date', offline: 'Offline — changes will sync when you’re back online', error: 'Sync problem: ' + (cloud.error || '') }[cloud.status] || '';
    main.innerHTML = head + `<div class="narrow" style="padding:36px 0 80px">
      <section class="panel" style="margin-bottom:20px"><h3>Signed in as ${esc(u.name)}</h3><p class="voice-note">${esc(u.email)} · member since ${new Date(u.created).toLocaleDateString()}</p>
        <p><span class="sync-dot ${esc(cloud.status)}"></span> ${esc(statusText)} · last sync ${esc(ago(cloud.lastSync))}</p>
        <div class="quiz-actions"><button class="btn btn-line btn-sm" data-acc="sync">Sync now</button><button class="btn btn-line btn-sm" data-acc="export">Copy my data</button><button class="btn btn-ink btn-sm" data-acc="logout">Sign out</button></div></section>
      <section class="panel" style="margin-bottom:20px"><h3>Profile</h3>
        <div class="field"><label for="pf-name">Name</label><input id="pf-name" type="text" maxlength="40" value="${esc(u.name)}" style="font-family:var(--f-ui);font-size:1rem"></div>
        <label class="check"><input id="pf-native" type="checkbox" ${u.native ? 'checked' : ''}> I’m a native or fluent Kyrgyz speaker</label>
        <label class="check"><input id="pf-board" type="checkbox" ${u.board ? 'checked' : ''}> Show me in the weekly league</label>
        <div class="quiz-actions"><button class="btn btn-ink btn-sm" data-acc="profile">Save profile</button></div></section>
      <section class="panel" style="margin-bottom:20px"><h3>Password</h3>
        <div class="field"><label for="pw-old">Current password</label><input id="pw-old" type="password" autocomplete="current-password" style="font-family:var(--f-ui);font-size:1rem"></div>
        <div class="field"><label for="pw-new">New password</label><input id="pw-new" type="password" autocomplete="new-password" style="font-family:var(--f-ui);font-size:1rem"></div>
        <div class="quiz-actions"><button class="btn btn-line btn-sm" data-acc="password">Change password</button><button class="btn btn-line btn-sm" data-acc="logout-all">Sign out on all devices</button></div></section>
      ${installBlock()}
      <section class="panel danger"><h3>Delete account</h3><p class="voice-note">Removes your account, progress, texts and community posts from the server. This can’t be undone.</p>
        <div class="field"><label for="del-pw">Type your password to confirm</label><input id="del-pw" type="password" autocomplete="current-password" style="font-family:var(--f-ui);font-size:1rem"></div>
        <button class="btn btn-line btn-sm" data-acc="delete" style="color:var(--red);border-color:var(--red)">Delete my account</button></section>
      <div class="form-msg" role="alert" style="margin-top:14px"></div></div>`;
    const msg = (t) => { $('.form-msg', main).textContent = t; };
    main.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-acc]'); if (!b) return;
      const act = b.dataset.acc; msg('');
      try {
        if (act === 'sync') { await cloud.syncNow(); A.route(); }
        if (act === 'export') { await navigator.clipboard.writeText(JSON.stringify(payload(), null, 1)); toast('Your data was copied to the clipboard.'); }
        if (act === 'logout' || act === 'logout-all') {
          await push();
          await api('/api/auth?a=' + act, { method: 'POST' });
          cloud.user = null; localStorage.removeItem('kyrgyzcha-v1');
          toast(act === 'logout' ? 'Signed out. Your progress is safe in your account.' : 'Signed out on all devices.');
          setTimeout(() => location.replace(location.pathname + '#home'), 300); setTimeout(() => location.reload(), 350);
        }
        if (act === 'profile') { const r = await api('/api/auth?a=profile', { method: 'POST', body: { name: $('#pf-name').value, native: $('#pf-native').checked, board: $('#pf-board').checked } }); cloud.user = r.user; renderButton(); toast('Profile saved.'); }
        if (act === 'password') { const r = await api('/api/auth?a=profile', { method: 'POST', body: { password: $('#pw-old').value, newPassword: $('#pw-new').value } }); cloud.user = r.user; toast('Password changed. Other devices were signed out.'); $('#pw-old').value = $('#pw-new').value = ''; }
        if (act === 'delete') {
          if (!b.dataset.sure) { b.dataset.sure = '1'; b.textContent = 'Click again to delete for good'; return; }
          await api('/api/auth?a=delete', { method: 'POST', body: { password: $('#del-pw').value } });
          localStorage.removeItem('kyrgyzcha-v1'); location.replace(location.pathname + '#home'); location.reload();
        }
      } catch (err) { msg(err.message); }
    });
  };
  A.TITLES.account = 'Your account';

  /* -------------------------------- Install ------------------------------- */
  let installEvt = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; document.body.classList.add('can-install'); });
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  function installBlock() {
    if (standalone()) return '';
    return `<section class="panel" style="margin:20px 0"><h3>Install the app</h3><p class="voice-note">Put Кыргызча on your home screen. It opens full-screen and keeps working offline.</p>
      <button class="btn btn-gold btn-sm install-btn" data-act="install">Install app</button>
      <p class="voice-note install-manual">On iPhone or iPad: tap <b>Share</b> → <b>Add to Home Screen</b>. On Android: browser menu → <b>Install app</b>.</p></section>`;
  }
  cloud.installBlock = installBlock;
  document.addEventListener('click', async (e) => {
    if (!e.target.closest('[data-act="install"]')) return;
    if (!installEvt) { toast('Use your browser menu: “Add to Home Screen” or “Install app”.'); return; }
    installEvt.prompt(); const c = await installEvt.userChoice; installEvt = null; document.body.classList.remove('can-install');
    if (c.outcome === 'accepted') toast('Installed! Find Кыргызча on your home screen.');
  });

  /* --------------------------------- Boot --------------------------------- */
  const prevBoot = A.HOOKS.boot;
  A.HOOKS.boot = async function () {
    if (prevBoot) prevBoot();
    renderButton();
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      navigator.serviceWorker.register('sw.js').catch(() => { /* not allowed here */ });
    }
    if (location.protocol === 'file:') { cloud.available = false; renderButton(); emit(); return; }
    try {
      const r = await api('/api/auth?a=me');
      cloud.available = true;
      if (r.user) await signedIn(r.user, false);
    } catch (e) { cloud.available = e.status === 503 ? false : !e.offline ? true : false; if (e.offline && navigator.onLine === false) cloud.available = true; if (e.status) cloud.serverError = e.message; }
    renderButton(); emit();
    const h = location.hash.replace('#', '');
    if (['', 'home', 'account', 'community', 'library', 'review', 'goals'].includes(h)) A.route();
  };
  window.addEventListener('online', () => { if (!cloud.user && cloud.available !== false) A.HOOKS.boot && api('/api/auth?a=me').then((r) => r.user && signedIn(r.user, false)).catch(() => {}); });
});
