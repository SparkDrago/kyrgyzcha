/* /api/state — the signed-in learner's progress document.
   GET → { state, updatedAt }   PUT { state } → { ok, updatedAt }
   The client merges local + server before writing, so the server just stores. */
'use strict';
const C = require('./_lib/core');

module.exports = C.handler(async (req, res) => {
  const user = await C.requireUser(req);
  const key = 'state:' + user.id;
  if (req.method === 'GET') {
    const doc = await C.getJSON(key);
    return C.send(res, 200, { state: doc ? doc.state : null, updatedAt: doc ? doc.updatedAt : 0 });
  }
  if (req.method !== 'PUT' && req.method !== 'POST') throw new C.HttpError(405, 'Use GET or PUT');
  await C.limit('state:' + user.id, 240, 3600);
  const b = await C.body(req);
  if (!b.state || typeof b.state !== 'object' || Array.isArray(b.state)) throw new C.HttpError(400, 'Missing state');
  const raw = JSON.stringify(b.state);
  if (raw.length > 900000) throw new C.HttpError(413, 'Progress data is too large.');
  const updatedAt = Date.now();
  await C.cmd('SET', key, JSON.stringify({ state: b.state, updatedAt }));
  C.send(res, 200, { ok: true, updatedAt });
});
