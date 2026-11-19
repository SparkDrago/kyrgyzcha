/* Offline support: cache the app shell; never cache the API. */
const CACHE = 'kyrgyzcha-v7';
const CORE = ['./', 'index.html', 'css/style.css', 'favicon.svg', 'manifest.webmanifest', 'js/kg.js', 'js/app.js', 'js/cloud.js', 'js/reader.js', 'js/learn.js', 'js/drops.js', 'js/dictionary.js',
  'js/data/alphabet.js', 'js/data/course-0-1.js', 'js/data/course-2.js', 'js/data/course-3.js', 'js/data/course-4.js', 'js/data/course-5.js', 'js/data/course-6.js',
  'js/data/readers.js', 'js/data/arabic.js', 'js/data/arabic-logic.js', 'js/data/drops.js', 'js/data/drops-more.js', 'js/data/lexicon.js', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.pathname.startsWith('/api/')) return;
  const sameOrigin = url.origin === location.origin, fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !fonts) return;
  // Stale-while-revalidate: instant from cache, refreshed in the background.
  e.respondWith(caches.open(CACHE).then(async (c) => {
    const hit = await c.match(e.request, { ignoreSearch: sameOrigin });
    const net = fetch(e.request).then((r) => { if (r && (r.ok || r.type === 'opaque')) c.put(e.request, r.clone()); return r; }).catch(() => hit || (e.request.mode === 'navigate' ? c.match('index.html') : undefined));
    return hit || net;
  }));
});
