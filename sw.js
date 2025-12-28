// Service Worker for CSS3 Mastery PWA
const CACHE_NAME = 'css-mastery-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/main.css',
    '/assets/js/app.js',
    '/assets/images/favicon.png',
    '/pages/basic.html',
    '/pages/medium.html',
    '/pages/advanced.html',
    '/pages/phd.html',
    '/pages/experimental.html',
    '/pages/reference.html'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Update Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
