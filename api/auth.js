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
    const { salt, hash } = await C.hashPassword(pw);
    const r = await C.db('kg_signup', { id: C.id(9), email, name, salt, hash, native: !!b.native });
    if (r.error === 'exists') throw new C.HttpError(409, 'An account with this email already exists. Sign in instead.');
    return C.send(res, 200, { user: C.publicUser(r.user) }, { 'Set-Cookie': C.sessionCookie(req, r.user.id, 0) });
  }

  if (a === 'login') {
    const email = C.clean(b.email, 254).toLowerCase();
    await C.limit('login:' + C.ip(req), 30, 900);
    await C.limit('login-email:' + email, 10, 900);
    const user = await C.db('kg_user_by_email', { email });
    if (!user) { await C.hashPassword(String(b.password || '')); throw new C.HttpError(401, 'Email or password is wrong.'); } // same timing as a real check
    if (!(await C.checkPassword(String(b.password || ''), user))) throw new C.HttpError(401, 'Email or password is wrong.');
    return C.send(res, 200, { user: C.publicUser(user) }, { 'Set-Cookie': C.sessionCookie(req, user.id, user.ver) });
  }

  if (a === 'logout') return C.send(res, 200, { ok: true }, { 'Set-Cookie': C.clearCookie() });

  const user = await C.requireUser(req);

  if (a === 'profile') {
    const patch = { id: user.id };
    if (b.name !== undefined) patch.name = C.clean(b.name, 40) || user.name;
    if (b.native !== undefined) patch.native = !!b.native;
    if (b.board !== undefined) patch.board = !!b.board;
    if (b.newPassword) {
      if (!(await C.checkPassword(String(b.password || ''), user))) throw new C.HttpError(401, 'Your current password is wrong.');
      if (String(b.newPassword).length < 8) throw new C.HttpError(400, 'Use a password of at least 8 characters.');
      Object.assign(patch, await C.hashPassword(String(b.newPassword)), { ver: (user.ver || 0) + 1 });
    }
    const updated = await C.db('kg_update_user', patch);
    return C.send(res, 200, { user: C.publicUser(updated) }, b.newPassword ? { 'Set-Cookie': C.sessionCookie(req, updated.id, updated.ver) } : {});
  }

  if (a === 'logout-all') {
    await C.db('kg_update_user', { id: user.id, ver: (user.ver || 0) + 1 });
    return C.send(res, 200, { ok: true }, { 'Set-Cookie': C.clearCookie() });
  }

  if (a === 'delete') {
    if (!(await C.checkPassword(String(b.password || ''), user))) throw new C.HttpError(401, 'Password is wrong.');
    await C.db('kg_delete_user', { id: user.id }); // cascades to progress, texts, posts, corrections, league
    return C.send(res, 200, { ok: true }, { 'Set-Cookie': C.clearCookie() });
  }

  throw new C.HttpError(404, 'Unknown action');
});
