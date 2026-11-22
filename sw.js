const CACHE_NAME = 'smart-worker-pro-v115';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css?v=107',
  './app.js?v=115',
  './manifest.json',
  './logo.png?v=34',
  './icon-192.png'
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
  // Network-First for HTML/JS/CSS so updates appear immediately, falling back to cache when offline
  event.respondWith(
    fetch(event.request).then(function(netResp) {
      if (netResp && netResp.status === 200) {
        const respClone = netResp.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, respClone);
        });
      }
      return netResp;
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});
