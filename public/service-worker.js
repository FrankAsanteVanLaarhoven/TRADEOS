// ==============================================================================
// TradeOS Africa - Enterprise Service Worker (PWA Runtime)
// Sovereign B2B Commerce & Cross-Border Logistics Infrastructure
// ==============================================================================

const CACHE_NAME = 'tradeos-v2.6.4';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/tokens.css?v=2.6.4',
  '/css/main.css?v=2.6.4',
  '/css/control-room.css?v=2.6.4',
  '/css/shopify-admin.css?v=2.6.4',
  '/css/operations.css?v=2.6.4',
  '/js/store.js?v=2.6.4',
  '/js/landed-cost.js?v=2.6.4',
  '/js/motion.js?v=2.6.4',
  '/js/app.js?v=2.6.4',
  '/favicon.svg',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        // Continue even if some individual asset misses in dev
        return Promise.resolve();
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Bypass API and GraphQL calls to ensure live telemetry and prices
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/graphql') || url.pathname === '/health') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached and refresh in background (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
