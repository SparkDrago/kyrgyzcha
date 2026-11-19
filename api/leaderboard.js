/* /api/leaderboard — weekly XP league.  GET → top 25 + my rank   POST {xp} → add XP */
'use strict';
const C = require('./_lib/core');


module.exports = C.handler(async (req, res) => {
  const wk = C.weekKey(new Date());
  const me = await C.currentUser(req);
  if (req.method === 'GET') {
    await C.limit('lbget:' + C.ip(req), 120, 60);
    const flat = await C.cmd('ZREVRANGE', wk, 0, 24, 'WITHSCORES');
    const rows = [];
    for (let i = 0; i < flat.length; i += 2) rows.push({ uid: flat[i], xp: Math.round(Number(flat[i + 1])) });
    const names = rows.length ? await C.cmd('MGET', ...rows.map((r) => 'lbname:' + r.uid)) : [];
    return C.send(res, 200, { week: wk.slice(3), rows: rows.map((r, i) => ({ rank: i + 1, name: names[i] || 'Learner', xp: r.xp, me: !!me && r.uid === me.id })) });
  }
  if (req.method !== 'POST') throw new C.HttpError(405, 'Method not allowed');
  const user = await C.requireUser(req);
  if (user.board === false) return C.send(res, 200, { ok: true, hidden: true });
  await C.limit('xp:' + user.id, 200, 3600);
  const b = await C.body(req);
  const xp = Math.max(0, Math.min(150, Math.round(Number(b.xp) || 0)));
  if (!xp) return C.send(res, 200, { ok: true });
  await C.pipe([['ZINCRBY', wk, xp, user.id], ['EXPIRE', wk, 60 * 60 * 24 * 21], ['SET', 'lbname:' + user.id, user.name, 'EX', 60 * 60 * 24 * 21]]);
  C.send(res, 200, { ok: true });
});
