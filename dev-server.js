#!/usr/bin/env node
/* Local development server: serves the site and runs /api/*.js exactly like Vercel does.
   Data goes to .devdb.json in this folder unless Upstash env vars are set.
   Usage:  node dev-server.js        then open http://localhost:3000 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const VHEAD = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8')).headers || []; } catch (e) { return []; } })();
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.md': 'text/plain; charset=utf-8' };

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) {
    const name = url.pathname.slice(5).replace(/[^a-z-]/g, '');
    const file = path.join(ROOT, 'api', name + '.js');
    if (!name || name.startsWith('_') || !fs.existsSync(file)) { res.statusCode = 404; return res.end('{"error":"Not found"}'); }
    return require(file)(req, res);
  }
  let p = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (p === '/' || p === '\\') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || /\/(api|\.devdb)/.test(p) || p.includes('dev-server')) { res.statusCode = 404; return res.end('Not found'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.statusCode = 404; return res.end('Not found'); }
    VHEAD.forEach((h) => { const re = new RegExp('^' + h.source.replace('(.*)', '.*') + '$'); if (re.test(url.pathname)) h.headers.forEach((x) => res.setHeader(x.key, x.value)); });
    res.setHeader('Content-Type', TYPES[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
}).listen(PORT, () => console.log(`Кыргызча running at http://localhost:${PORT}`));
