/* Sigiro Construction & General Supplies — service worker
   Lightweight: network-first for navigations with an offline fallback,
   cache-first for hashed static assets. Keeps the app installable and
   usable on flaky connections. */

const VERSION = "sigiro-v1";
const STATIC_CACHE = `${VERSION}-static`;
const PAGE_CACHE = `${VERSION}-pages`;

const OFFLINE_URL = "/offline";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        cache.addAll([
          "/icon-192x192.png",
          "/icon-512x512.png",
          "/icon-512x512-maskable.png",
          "/favicon.png",
          OFFLINE_URL,
        ])
      )
      .catch(() => undefined)
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: network first, fall back to cache, then offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(PAGE_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const offline = await caches.match(OFFLINE_URL);
          if (offline) return offline;
          return new Response("You are offline.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          });
        })
    );
    return;
  }

  // Hashed build assets & images: cache first (immutable content).
  const isStatic =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/images/") ||
    /\.(png|jpg|jpeg|webp|svg|ico|woff2?)$/.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          })
      )
    );
  }
});
