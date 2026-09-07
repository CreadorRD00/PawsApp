const CACHE_NAME = 'pawsapp-cache-v1';
const URLS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network-first para que siempre intente traer lo más nuevo;
  // si no hay internet, usa lo que tenga guardado en caché.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// ---------- Notificaciones push ----------
self.addEventListener('push', (event) => {
  let data = { title: 'PawsApp', body: 'Tienes un recordatorio pendiente.' };
  try{ data = event.data.json(); }catch(e){}
  event.waitUntil(
    self.registration.showNotification(data.title || 'PawsApp', {
      body: data.body || '',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      data: { url: data.url || './index.html' }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || './index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for(const client of clientList){
        if('focus' in client) return client.focus();
      }
      if(clients.openWindow) return clients.openWindow(url);
    })
  );
});
