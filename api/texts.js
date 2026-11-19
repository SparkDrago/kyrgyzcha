/* /api/texts — texts a learner imported into their library (LingQ-style).
   GET → list   GET ?id= → one text   POST {title,text,level} → create   DELETE ?id= */
'use strict';
const C = require('./_lib/core');
const MAX_TEXTS = 150, MAX_LEN = 30000;

module.exports = C.handler(async (req, res, q) => {
  const user = await C.requireUser(req);

  if (req.method === 'GET') {
    if (!q.id) return C.send(res, 200, { texts: await C.db('kg_texts', { uid: user.id }) });
    const t = await C.db('kg_text', { uid: user.id, id: C.safeId(q.id) });
    if (!t) throw new C.HttpError(404, 'Text not found');
    return C.send(res, 200, { text: t });
  }

  if (req.method === 'DELETE') {
    await C.db('kg_delete_text', { uid: user.id, id: C.safeId(q.id) });
    return C.send(res, 200, { ok: true });
  }

  if (req.method !== 'POST') throw new C.HttpError(405, 'Method not allowed');
  await C.limit('texts:' + user.id, 60, 3600);
  const b = await C.body(req);
  const text = C.clean(b.text, MAX_LEN + 1);
  if (text.length < 2) throw new C.HttpError(400, 'Paste some Kyrgyz text first.');
  if (text.length > MAX_LEN) throw new C.HttpError(400, `Texts can be up to ${MAX_LEN.toLocaleString()} characters. Split it into parts.`);
  const meta = await C.db('kg_put_text', {
    uid: user.id, id: b.id ? C.safeId(b.id) : C.id(8), title: C.clean(b.title, 120) || 'Untitled', level: C.clean(b.level, 10),
    source: C.clean(b.source, 300), created: Number(b.created) || Date.now(), text, max: MAX_TEXTS
  });
  if (meta.error === 'full') throw new C.HttpError(400, 'Your library is full. Delete a few texts first.');
  C.send(res, 200, { text: meta });
});
