
/**
 * @author duantao
 * @file service worker
 * @date 2018/7/23
 */

let cacheName = 'v0';


// install 存入缓存
self.addEventListener('install', event => {
    event.waitUntil(caches.open(cacheName).then(cache => {
        return cache.addAll([
            // '/',
            '/index.html',
            '/restaurant.html',
            '/worker.js',
            '/js/dbhelper.js',
            '/js/main.js',
            '/js/restaurant_info.js',
            '/css/responsive.css',
            '/css/styles.css',
            '/data/restaurants.json',
            '/img/1.jpg',
            '/img/2.jpg',
            '/img/3.jpg',
            '/img/4.jpg',
            '/img/5.jpg',
            '/img/6.jpg',
            '/img/7.jpg',
            '/img/8.jpg',
            '/img/9.jpg',
            '/img/10.jpg'
        ])
    }))
});


// activate

self.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
            if (cacheName.indexOf(key) === -1) {
                return caches.delete(key);
            }
        }))
    }))
});


//

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        if (response) {
            return response;
        }
        else {
            return fetch(event.request).then(res => {
                
                let resCache = res.clone();
                
                caches.open(cacheName).then(cache => {
                    cache.put(event.request, resCache)
                });
                
                return res;
            }).catch(err => {
                console.log(err);
            });
        }
    }))
});