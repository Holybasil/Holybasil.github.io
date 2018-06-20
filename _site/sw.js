var CACHE_NAME = 'madhur-cache-v1'; var urlsToCache = [ 'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js', 'https://cdn.bootcss.com/mdui/0.2.1/js/mdui.min.js', 'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js', 'https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js', 'https://cdn.bootcss.com/mdui/0.2.1/css/mdui.min.css', 'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css', '/category/Living.html', '/about/', '/category/', '/editor/', '/friends/', '/assets/css/global.css', '/', '/search.json', '/sw.js', '/tags/', '/tags.json', '/category/technology.html', '/sitemap.xml', '/robots.txt', '/feed.xml', '/code/2018/06/19/grid.html', '/technology/2017/05/27/how-to-install-jekyll.html', '/CHANGELOG.md', '/assets/css/customCss.css', '/assets/fonts/parley bold.ttf', '/assets/fonts/parley typeface/Sem Título-5.jpg', '/assets/fonts/parley typeface/Sem Título-6.jpg', '/assets/fonts/parley typeface/parley regular.ttf', '/assets/images/bgimgs/gongyuanxun.jpg', '/assets/images/bgimgs/me.jpeg', '/assets/images/posts/grid-line.png', '/assets/images/touch/apple-touch-icon.png', '/assets/images/touch/chrome-touch-icon-192x192.png', '/assets/images/touch/icon-128x128.png', '/assets/images/touch/ms-touch-icon-144x144-precomposed.png', '/assets/js/History.js', '/assets/js/customJS.js', '/jekyll-theme-mdui-0.5.2.1.gem', '/jekylltheme.jpg', '/manifest.json', '/package-lock.json', ]; self.addEventListener('install', function(event) { event.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(urlsToCache); }).catch(function(err) { console.log('Cache add error: ', err); })); }); self.addEventListener('fetch', function(event) { event.respondWith( caches.match(event.request) .then(function(response) { if (response) { return response; } var fetchRequest = event.request.clone(); return fetch(fetchRequest).then( function(response) { if(!response || response.status !== 200 || response.type !== 'basic') { return response; } var responseToCache = response.clone(); caches.open(CACHE_NAME) .then(function(cache) { cache.put(event.request, responseToCache); }); return response; } ); }) ); }); self.addEventListener('fetch', function(event) { event.respondWith( caches.open(CACHE_NAME).then(function(cache) { return fetch(event.request).then(function(response) { cache.put(event.request, response.clone()); return response; }); }).catch(function() { return caches.match('/offline.html'); }) ); });