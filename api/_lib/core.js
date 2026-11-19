/* Shared server code for the Кыргызча API (Vercel Node functions).
   Zero dependencies: Node's crypto + fetch to the Upstash Redis REST API.
   Files in /api starting with "_" are not deployed as routes. */
'use strict';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ON_VERCEL = !!process.env.VERCEL;
const DB_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const DB_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }

/* ------------------------------- Database -------------------------------- */
// Production: Upstash Redis over HTTPS. Local dev: a tiny JSON-file stand-in
// implementing only the commands this app uses.
async function upstash(body, pipeline) {
  const r = await fetch(DB_URL.replace(/\/$/, '') + (pipeline ? '/pipeline' : ''), {
    method: 'POST', headers: { Authorization: 'Bearer ' + DB_TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  const j = await r.json().catch(() => ({ error: 'Bad database response' }));
  if (!r.ok || j.error) throw new HttpError(502, 'Database error: ' + (j.error || r.status));
  return pipeline ? j.map((x) => { if (x.error) throw new HttpError(502, 'Database error: ' + x.error); return x.result; }) : j.result;
}

const DEV_FILE = process.env.KG_DEV_DB || path.join(process.cwd(), '.devdb.json');
let mem = null;
function devLoad() { if (!mem) { try { mem = JSON.parse(fs.readFileSync(DEV_FILE, 'utf8')); } catch (e) { mem = { kv: {}, exp: {} }; } } return mem; }
function devSave() { fs.writeFileSync(DEV_FILE, JSON.stringify(mem)); }
function devCmd(c) {
  const m = devLoad(), kv = m.kv, op = String(c[0]).toUpperCase(), k = c[1];
  const now = Date.now();
  Object.keys(m.exp).forEach((key) => { if (m.exp[key] < now) { delete kv[key]; delete m.exp[key]; } });
  const list = () => (Array.isArray(kv[k]) ? kv[k] : (kv[k] = []));
  const zset = () => (kv[k] && typeof kv[k] === 'object' && !Array.isArray(kv[k]) ? kv[k] : (kv[k] = {}));
  switch (op) {
    case 'GET': return typeof kv[k] === 'string' ? kv[k] : null;
    case 'MGET': return c.slice(1).map((x) => (typeof kv[x] === 'string' ? kv[x] : null));
    case 'SET': {
      const opts = c.slice(3).map((x) => String(x).toUpperCase());
      if (opts.includes('NX') && kv[k] !== undefined) return null;
      kv[k] = String(c[2]); delete m.exp[k];
      const ex = opts.indexOf('EX'); if (ex >= 0) m.exp[k] = now + Number(c[3 + ex + 1]) * 1000;
      return 'OK';
    }
    case 'DEL': { let n = 0; c.slice(1).forEach((x) => { if (kv[x] !== undefined) { delete kv[x]; delete m.exp[x]; n++; } }); return n; }
    case 'INCR': { const v = (parseInt(kv[k], 10) || 0) + 1; kv[k] = String(v); return v; }
    case 'INCRBY': { const v = (parseInt(kv[k], 10) || 0) + Number(c[2]); kv[k] = String(v); return v; }
    case 'EXPIRE': if (kv[k] === undefined) return 0; m.exp[k] = now + Number(c[2]) * 1000; return 1;
    case 'LPUSH': { const l = list(); c.slice(2).forEach((v) => l.unshift(String(v))); return l.length; }
    case 'LTRIM': { const l = list(); const s = Number(c[2]), e = Number(c[3]); kv[k] = l.slice(s, e < 0 ? l.length + e + 1 : e + 1); return 'OK'; }
    case 'LRANGE': { const l = list(); const s = Number(c[2]), e = Number(c[3]); return l.slice(s, e < 0 ? l.length + e + 1 : e + 1); }
    case 'LREM': { const l = list(); const before = l.length; kv[k] = l.filter((v) => v !== String(c[3])); return before - kv[k].length; }
    case 'LLEN': return list().length;
    case 'ZINCRBY': { const z = zset(); z[c[3]] = (z[c[3]] || 0) + Number(c[2]); return String(z[c[3]]); }
    case 'ZREVRANGE': {
      const z = zset(); const arr = Object.entries(z).sort((a, b) => b[1] - a[1]).slice(Number(c[2]), Number(c[3]) + 1);
      return String(c[4] || '').toUpperCase() === 'WITHSCORES' ? arr.flatMap(([mbr, s]) => [mbr, String(s)]) : arr.map((x) => x[0]);
    }
    case 'ZREM': { const z = zset(); const had = z[c[2]] !== undefined; delete z[c[2]]; return had ? 1 : 0; }
    default: throw new Error('Dev DB: unsupported command ' + op);
  }
}

function dbReady() { return !!(DB_URL && DB_TOKEN) || !ON_VERCEL; }
async function cmd(...args) {
  if (DB_URL && DB_TOKEN) return upstash(args.map(String), false);
  if (ON_VERCEL) throw new HttpError(503, 'Database not connected. Add the Upstash for Redis integration to this Vercel project (see README).');
  const r = devCmd(args); devSave(); return r;
}
async function pipe(cmds) {
  if (!cmds.length) return [];
  if (DB_URL && DB_TOKEN) return upstash(cmds.map((c) => c.map(String)), true);
  if (ON_VERCEL) throw new HttpError(503, 'Database not connected.');
  const r = cmds.map(devCmd); devSave(); return r;
}
const getJSON = async (k) => { const v = await cmd('GET', k); return v ? JSON.parse(v) : null; };
const setJSON = (k, v) => cmd('SET', k, JSON.stringify(v));

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
  const user = await getJSON('user:' + data.uid);
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
  const k = 'rl:' + key;
  // Fixed window: the counter is created with its expiry once, so it always resets on time.
  const [, n] = await pipe([['SET', k, '0', 'NX', 'EX', windowSec], ['INCR', k]]);
  if (n > max) throw new HttpError(429, 'Too many requests — please slow down and try again later.');
}

const id = (n) => crypto.randomBytes(n || 9).toString('base64url');
// IDs that come from the browser may only contain URL-safe characters (they become database keys).
const safeId = (s) => { const v = String(s == null ? '' : s).slice(0, 40); if (!/^[A-Za-z0-9_-]+$/.test(v)) throw new HttpError(400, 'Invalid id'); return v; };
function weekKey(d) {
  d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = d.getUTCDay() || 7; d.setUTCDate(d.getUTCDate() + 4 - day);
  const y = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return 'lb:' + d.getUTCFullYear() + '-W' + String(Math.ceil(((d - y) / 864e5 + 1) / 7)).padStart(2, '0');
}
const clean = (s, max) => String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);

/* Wrap a handler: errors → JSON, CSRF check, DB readiness. */
function handler(fn) {
  return async (req, res) => {
    try {
      requireCsrf(req);
      if (!dbReady()) throw new HttpError(503, 'Database not connected.');
      await fn(req, res, query(req));
    } catch (e) {
      const status = e.status || 500;
      if (status === 500) console.error(e);
      send(res, status, { error: e.status ? e.message : 'Server error' });
    }
  };
}

module.exports = { HttpError, cmd, pipe, getJSON, setJSON, body, send, query, ip, sessionCookie, clearCookie, currentUser, requireUser, publicUser, hashPassword, checkPassword, limit, id, safeId, weekKey, clean, handler };
