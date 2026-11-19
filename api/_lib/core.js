/* Shared server code for the Кыргызча API (Vercel Node functions).
   Zero dependencies: Node's crypto + fetch to the Upstash Redis REST API.
   Files in /api starting with "_" are not deployed as routes. */
'use strict';
const crypto = require('crypto');

const ON_VERCEL = !!process.env.VERCEL;
const SB_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '');
const SB_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }

/* ------------------------------- Database -------------------------------- */
// All data lives in Supabase (Postgres). The server calls the SQL functions in
// supabase/schema.sql through Supabase's REST API with the secret key. The
// browser never talks to Supabase, and the tables are closed to everyone else.
const dbReady = () => !!(SB_URL && SB_KEY);
async function db(fn, p) {
  if (!dbReady()) throw new HttpError(503, 'Database not connected. Add the Supabase integration to this Vercel project (or set SUPABASE_URL and SUPABASE_SECRET_KEY), then redeploy.');
  const headers = { apikey: SB_KEY, 'Content-Type': 'application/json', Accept: 'application/json' };
  if (SB_KEY.startsWith('eyJ')) headers.Authorization = 'Bearer ' + SB_KEY; // legacy service-role JWT
  let r;
  try { r = await fetch(`${SB_URL}/rest/v1/rpc/${fn}`, { method: 'POST', headers, body: JSON.stringify({ p: p || {} }) }); }
  catch (e) { throw new HttpError(502, 'Can’t reach the database right now.'); }
  const text = await r.text();
  let j = null; try { j = text ? JSON.parse(text) : null; } catch (e) { /* not JSON */ }
  if (!r.ok) {
    const code = j && j.code, msg = (j && j.message) || String(r.status);
    if (code === 'PGRST202' || code === '42883' || code === '42P01' || code === 'PGRST205') throw new HttpError(503, 'The database tables are missing. Open Supabase → SQL Editor, paste the file supabase/schema.sql and press Run.');
    if (r.status === 401 || r.status === 403) throw new HttpError(503, 'The database key was rejected. Check SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) in Vercel.');
    console.error('Supabase error', fn, r.status, msg);
    throw new HttpError(502, 'Database error. Please try again.');
  }
  return j;
}

/* --------------------------------- HTTP ---------------------------------- */
function query(req) { return Object.fromEntries(new URL(req.url, 'http://x').searchParams); }
async function body(req) {
  if (req.body !== undefined && req.body !== null && req.body !== '') {
    if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
    try { return JSON.parse(String(req.body)); } catch (e) { throw new HttpError(400, 'Invalid JSON'); }
  }
  const chunks = []; let size = 0;
  for await (const ch of req) { size += ch.length; if (size > 1.5e6) throw new HttpError(413, 'Request too large'); chunks.push(ch); }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch (e) { throw new HttpError(400, 'Invalid JSON'); }
}
function send(res, status, obj, headers) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  Object.entries(headers || {}).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(obj));
}
function cookies(req) {
  const out = {};
  String(req.headers.cookie || '').split(';').forEach((p) => { const i = p.indexOf('='); if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim()); });
  return out;
}
function ip(req) { return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'local').split(',')[0].trim(); }
// Mutations must carry a custom header: browsers won't send it cross-site without CORS, which blocks CSRF.
function requireCsrf(req) { if (req.method !== 'GET' && req.headers['x-kg'] !== '1') throw new HttpError(403, 'Missing X-KG header'); }

/* -------------------------------- Sessions ------------------------------- */
const COOKIE = 'kg_s';
const MAX_AGE = 60 * 60 * 24 * 30;
function secret() {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 32) return s;
  if (ON_VERCEL) throw new HttpError(500, 'SESSION_SECRET is missing or shorter than 32 characters. Add it in Vercel → Settings → Environment Variables (see README).');
  return 'dev-only-secret-not-for-production-use-0123456789';
}
const b64 = (s) => Buffer.from(s).toString('base64url');
const sign = (data) => crypto.createHmac('sha256', secret()).update(data).digest('base64url');
function sessionCookie(req, uid, ver) {
  const payload = b64(JSON.stringify({ uid, v: ver || 0, exp: Math.floor(Date.now() / 1000) + MAX_AGE }));
  const secure = (req.headers['x-forwarded-proto'] || '').includes('https') || ON_VERCEL ? '; Secure' : '';
  return `${COOKIE}=${payload}.${sign(payload)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}${secure}`;
}
const clearCookie = () => `${COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`;
async function currentUser(req) {
  const raw = cookies(req)[COOKIE];
  if (!raw || !raw.includes('.')) return null;
  const [payload, sig] = raw.split('.');
  const good = sign(payload);
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  let data; try { data = JSON.parse(Buffer.from(payload, 'base64url').toString()); } catch (e) { return null; }
  if (!data.uid || data.exp < Date.now() / 1000) return null;
  const user = await db('kg_user', { id: data.uid });
  if (!user || (user.ver || 0) !== (data.v || 0)) return null; // logout-everywhere bumps ver
  return user;
}
async function requireUser(req) { const u = await currentUser(req); if (!u) throw new HttpError(401, 'Please sign in.'); return u; }
const publicUser = (u) => u && ({ id: u.id, email: u.email, name: u.name, native: !!u.native, board: u.board !== false, created: u.created });

/* -------------------------------- Passwords ------------------------------ */
function hashPassword(pw, salt) {
  salt = salt || crypto.randomBytes(16).toString('hex');
  return new Promise((ok, bad) => crypto.scrypt(pw, salt, 64, { N: 16384, r: 8, p: 1 }, (e, k) => (e ? bad(e) : ok({ salt, hash: k.toString('hex') }))));
}
async function checkPassword(pw, user) {
  const { hash } = await hashPassword(pw, user.salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(user.hash, 'hex'));
}

/* ------------------------------- Rate limits ----------------------------- */
async function limit(key, max, windowSec) {
  const { n } = await db('kg_limit', { key, window: windowSec });
  if (n > max) throw new HttpError(429, 'Too many requests — please slow down and try again later.');
}

const id = (n) => crypto.randomBytes(n || 9).toString('base64url');
// IDs that come from the browser may only contain URL-safe characters (they become database keys).
const safeId = (s) => { const v = String(s == null ? '' : s).slice(0, 40); if (!/^[A-Za-z0-9_-]+$/.test(v)) throw new HttpError(400, 'Invalid id'); return v; };
function weekKey(d) {
  d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = d.getUTCDay() || 7; d.setUTCDate(d.getUTCDate() + 4 - day);
  const y = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return d.getUTCFullYear() + '-W' + String(Math.ceil(((d - y) / 864e5 + 1) / 7)).padStart(2, '0');
}
const clean = (s, max) => String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);

/* Wrap a handler: errors → JSON, CSRF check, DB readiness. */
function handler(fn) {
  return async (req, res) => {
    try {
      requireCsrf(req);
      if (!dbReady()) throw new HttpError(503, 'Database not connected. Add the Supabase integration to this Vercel project (or set SUPABASE_URL and SUPABASE_SECRET_KEY), then redeploy.');
      await fn(req, res, query(req));
    } catch (e) {
      const status = e.status || 500;
      if (status === 500) console.error(e);
      send(res, status, { error: e.status ? e.message : 'Server error' });
    }
  };
}

module.exports = { HttpError, db, body, send, query, ip, sessionCookie, clearCookie, currentUser, requireUser, publicUser, hashPassword, checkPassword, limit, id, safeId, weekKey, clean, handler };
