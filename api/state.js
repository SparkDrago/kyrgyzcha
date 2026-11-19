/* /api/state — the signed-in learner's progress document.
   GET → { state, updatedAt }   PUT { state } → { ok, updatedAt }
   The client merges local + server before writing, so the server just stores. */
'use strict';
const C = require('./_lib/core');

module.exports = C.handler(async (req, res) => {
  const user = await C.requireUser(req);
  if (req.method === 'GET') return C.send(res, 200, await C.db('kg_get_state', { uid: user.id }));
  if (req.method !== 'PUT' && req.method !== 'POST') throw new C.HttpError(405, 'Use GET or PUT');
  await C.limit('state:' + user.id, 240, 3600);
  const b = await C.body(req);
  if (!b.state || typeof b.state !== 'object' || Array.isArray(b.state)) throw new C.HttpError(400, 'Missing state');
  if (JSON.stringify(b.state).length > 900000) throw new C.HttpError(413, 'Progress data is too large.');
  const r = await C.db('kg_put_state', { uid: user.id, state: b.state });
  C.send(res, 200, { ok: true, updatedAt: r.updatedAt });
});
