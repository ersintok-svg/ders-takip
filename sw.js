var CACHE='ders-takip-v3';
var FILES=['./manifest.json','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}))});
self.addEventListener('activate',function(e){e.waitUntil(clients.claim());e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}))});
self.addEventListener('fetch',function(e){
  if(e.request.url.match(/\.(png|svg|json)$/)){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}));return}
  e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,c)});return r}).catch(function(){return caches.match(e.request)}));
});
