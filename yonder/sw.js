// Minimal service worker: makes Yonder installable (needed for "Share → Yonder" on Android).
// Network first; falls back to the cached shell when offline.
const CACHE = 'yonder-shell-v3';
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'data.js', 'config.js', 'logo.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(()=>{})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request, {cache:'no-cache'}).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./'))));
});
