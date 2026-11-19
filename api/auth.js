/* /api/auth?a=signup|login|logout|me|profile|logout-all|delete */
'use strict';
const C = require('./_lib/core');

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;

module.exports = C.handler(async (req, res, q) => {
  const a = q.a || 'me';

  if (a === 'me') {
    const u = await C.currentUser(req);
    return C.send(res, 200, { user: C.publicUser(u) });
  }
  if (req.method !== 'POST') throw new C.HttpError(405, 'Use POST');
  const b = await C.body(req);

  if (a === 'signup') {
    await C.limit('signup:' + C.ip(req), 10, 3600);
    const email = C.clean(b.email, 254).toLowerCase();
    const name = C.clean(b.name, 40) || email.split('@')[0];
    const pw = String(b.password || '');
    if (!EMAIL.test(email)) throw new C.HttpError(400, 'Enter a valid email address.');
    if (pw.length < 8) throw new C.HttpError(400, 'Use a password of at least 8 characters.');
    if (pw.length > 200) throw new C.HttpError(400, 'That password is too long.');
    const uid = C.id(9);
    const claimed = await C.cmd('SET', 'email:' + email, uid, 'NX');
    if (!claimed) throw new C.HttpError(409, 'An account with this email already exists. Sign in instead.');
    const { salt, hash } = await C.hashPassword(pw);
    const user = { id: uid, email, name, salt, hash, native: !!b.native, board: true, created: Date.now(), ver: 0 };
    await C.setJSON('user:' + uid, user);
    return C.send(res, 200, { user: C.publicUser(user) }, { 'Set-Cookie': C.sessionCookie(req, uid, 0) });
  }

  if (a === 'login') {
    const email = C.clean(b.email, 254).toLowerCase();
    await C.limit('login:' + C.ip(req), 30, 900);
    await C.limit('login-email:' + email, 10, 900);
    const uid = await C.cmd('GET', 'email:' + email);
    const user = uid && (await C.getJSON('user:' + uid));
    if (!user) { await C.hashPassword(String(b.password || '')); throw new C.HttpError(401, 'Email or password is wrong.'); } // same timing as a real check
    if (!(await C.checkPassword(String(b.password || ''), user))) throw new C.HttpError(401, 'Email or password is wrong.');
    return C.send(res, 200, { user: C.publicUser(user) }, { 'Set-Cookie': C.sessionCookie(req, user.id, user.ver) });
  }

  if (a === 'logout') return C.send(res, 200, { ok: true }, { 'Set-Cookie': C.clearCookie() });

  const user = await C.requireUser(req);

  if (a === 'profile') {
    if (b.name !== undefined) user.name = C.clean(b.name, 40) || user.name;
    if (b.native !== undefined) user.native = !!b.native;
    if (b.board !== undefined) user.board = !!b.board;
    if (b.newPassword) {
      if (!(await C.checkPassword(String(b.password || ''), user))) throw new C.HttpError(401, 'Your current password is wrong.');
      if (String(b.newPassword).length < 8) throw new C.HttpError(400, 'Use a password of at least 8 characters.');
      Object.assign(user, await C.hashPassword(String(b.newPassword)));
      user.ver = (user.ver || 0) + 1;
    }
    await C.setJSON('user:' + user.id, user);
    return C.send(res, 200, { user: C.publicUser(user) }, b.newPassword ? { 'Set-Cookie': C.sessionCookie(req, user.id, user.ver) } : {});
  }

  if (a === 'logout-all') {
    user.ver = (user.ver || 0) + 1;
    await C.setJSON('user:' + user.id, user);
    return C.send(res, 200, { ok: true }, { 'Set-Cookie': C.clearCookie() });
  }

  if (a === 'delete') {
    if (!(await C.checkPassword(String(b.password || ''), user))) throw new C.HttpError(401, 'Password is wrong.');
    const texts = (await C.getJSON('texts:' + user.id)) || [];
    const posts = await C.cmd('LRANGE', 'posts:user:' + user.id, 0, 199);
    await C.cmd('ZREM', C.weekKey(new Date()), user.id);
    if (posts.length) await C.pipe(posts.flatMap((pid) => [['DEL', 'post:' + pid, `post:${pid}:c`], ['LREM', 'posts:recent', 0, pid]]));
    await C.cmd('DEL', 'user:' + user.id, 'email:' + user.email, 'state:' + user.id, 'texts:' + user.id, 'inbox:' + user.id, 'posts:user:' + user.id, 'lbname:' + user.id, ...texts.map((t) => `text:${user.id}:${t.id}`));
    return C.send(res, 200, { ok: true }, { 'Set-Cookie': C.clearCookie() });
  }

  throw new C.HttpError(404, 'Unknown action');
});
