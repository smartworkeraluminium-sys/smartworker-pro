const CACHE_NAME = 'smart-worker-pro-v50';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css?v=35',
  './app.js?v=34',
  './manifest.json',
  './logo.png?v=34'
];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CORE_ASSETS).catch(function() {});
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  const reqUrl = event.request.url;
  if (reqUrl.includes('firestore.googleapis.com') || reqUrl.includes('firebaseio.com') || reqUrl.includes('script.google.com')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(cachedResp) {
      const fetchPromise = fetch(event.request).then(function(netResp) {
        if (netResp && netResp.status === 200) {
          const respClone = netResp.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, respClone);
          });
        }
        return netResp;
      }).catch(function() {
        return cachedResp;
      });
      return cachedResp || fetchPromise;
    })
  );
});
