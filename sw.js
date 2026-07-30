var CACHE='ders-takip-v2';
var FILES=['./','./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}))});
self.addEventListener('activate',function(e){e.waitUntil(clients.claim());e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}))});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request)}))});
