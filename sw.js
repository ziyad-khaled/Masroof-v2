const CACHE = 'masroof-v1';
const ASSETS = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap'
];

// ---------- Install ----------
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// ---------- Activate ----------
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// ---------- Fetch (network-first, cache only GET) ----------
self.addEventListener('fetch', e => {
  // Don't intercept non‑GET requests (Supabase DELETE/POST etc.)
  if (e.request.method !== 'GET') return;

  e.respondWith(
    // Try network first
    fetch(e.request)
      .then(response => {
        // Cache only successful GET responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline – serve from cache if available
        return caches.match(e.request);
      })
  );
});
