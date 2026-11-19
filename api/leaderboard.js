/* /api/leaderboard — weekly XP league.  GET → top 25   POST {xp} → add XP */
'use strict';
const C = require('./_lib/core');

module.exports = C.handler(async (req, res) => {
  const week = C.weekKey(new Date());
  const me = await C.currentUser(req);
  if (req.method === 'GET') {
    await C.limit('lbget:' + C.ip(req), 120, 60);
    const rows = await C.db('kg_board', { week, limit: 25 });
    return C.send(res, 200, { week, rows: rows.map((r, i) => ({ rank: i + 1, name: r.name, xp: r.xp, me: !!me && r.uid === me.id })) });
  }
  if (req.method !== 'POST') throw new C.HttpError(405, 'Method not allowed');
  const user = await C.requireUser(req);
  if (user.board === false) return C.send(res, 200, { ok: true, hidden: true });
  await C.limit('xp:' + user.id, 200, 3600);
  const b = await C.body(req);
  const xp = Math.max(0, Math.min(150, Math.round(Number(b.xp) || 0)));
  if (xp) await C.db('kg_add_xp', { week, uid: user.id, xp });
  C.send(res, 200, { ok: true });
});
