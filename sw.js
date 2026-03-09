const cacheName = 'papelaria-v5';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Instalação do Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Estratégia de Cache: Tenta rede, se falhar, usa o cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
