const CACHE_NAME = 'pacman_cache';
const D_CACHE_NAME = 'dynamic_pacman_cache';

self.addEventListener('message', async ({ data }) => {
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(Array.from(new Set(data)));
})

self.addEventListener('activate', async () => {
  console.log('[SW]: activate', cache);
  if (cache) {
    const cacheNames = await cache.keys();

    await Promise.all(
      cacheNames
      .filter(name => name !== CACHE_NAME || name !== D_CACHE_NAME)
      .map(name => caches.delete(name))
    );
  }
})

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached || await fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open(D_CACHE_NAME);

  try {
    const response = await fetch(request);
    if (request.method === 'GET') {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    return cached || 'Невозможно получить данные. Попробуйте позже.';
  }
}

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  } else if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
})
