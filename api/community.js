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

// Never send user ids to the browser — only whether a post is yours.
const view = (p, me) => p && ({ id: p.id, name: p.name, native: p.native, prompt: p.prompt, level: p.level, text: p.text, created: p.created, nc: p.nc || 0, mine: !!me && p.uid === me.id });

module.exports = C.handler(async (req, res, q) => {
  const a = q.a || 'feed';
  const me = await C.currentUser(req);

  if (req.method === 'GET') {
    await C.limit('cget:' + C.ip(req), 120, 60);
    if (a === 'feed') {
      const posts = await C.db('kg_feed', { limit: 50, prompt: q.prompt ? C.clean(q.prompt, 60) : null });
      return C.send(res, 200, { posts: posts.map((p) => view(p, me)) });
    }
    if (a === 'post') {
      const r = await C.db('kg_post', { id: C.safeId(q.id) });
      if (!r) throw new C.HttpError(404, 'Post not found');
      return C.send(res, 200, { post: view(r.post, me), corrections: r.corrections.map((c) => ({ id: c.id, name: c.name, native: c.native, text: c.text, comment: c.comment, created: c.created, helpful: c.helpful || 0, mine: !!me && c.uid === me.id })) });
    }
    if (a === 'mine') {
      if (!me) return C.send(res, 200, { posts: [], unread: 0 });
      const r = await C.db('kg_my_posts', { uid: me.id });
      return C.send(res, 200, { posts: r.posts.map((p) => view(p, me)), unread: r.unread || 0 });
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
    const p = await C.db('kg_create_post', { id: C.id(8), uid: user.id, prompt: C.clean(b.prompt, 60), level: C.clean(b.level, 10), text });
    return C.send(res, 200, { post: view(p, user) });
  }

  if (a === 'seen') { await C.db('kg_seen', { uid: user.id }); return C.send(res, 200, { ok: true }); }

  const postId = C.safeId(b.id);

  if (a === 'correct') {
    await C.limit('correct:' + user.id, 80, 86400);
    const text = C.clean(b.text, 2001), comment = C.clean(b.comment, 600);
    if (!text && !comment) throw new C.HttpError(400, 'Write a correction or a comment.');
    if (text.length > 2000) throw new C.HttpError(400, 'Correction is too long.');
    const r = await C.db('kg_add_correction', { id: C.id(6), post_id: postId, uid: user.id, text, comment });
    if (r.error) throw new C.HttpError(404, 'Post not found');
    return C.send(res, 200, { ok: true, id: r.id });
  }

  if (a === 'helpful') {
    const r = await C.db('kg_helpful', { post_id: postId, cid: C.safeId(b.cid), uid: user.id });
    if (r.error) throw new C.HttpError(403, 'Only the author can mark corrections as helpful.');
    return C.send(res, 200, { ok: true });
  }

  if (a === 'report') { await C.db('kg_report', { post_id: postId, uid: user.id }); return C.send(res, 200, { ok: true }); }

  if (a === 'delete') {
    const r = await C.db('kg_delete_post', { post_id: postId, uid: user.id });
    if (r.error) throw new C.HttpError(403, 'You can only delete your own posts.');
    return C.send(res, 200, { ok: true });
  }

  throw new C.HttpError(404, 'Unknown action');
});
