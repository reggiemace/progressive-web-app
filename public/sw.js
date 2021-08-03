const staticCacheName = "static-resources";
const dynamicCacheName = "dynamic-resources-v1";
const assets = [
  "/",
  "app.js",
  "index.html",
  "index.js",
  "styles.css",
  "manifest.json",
  "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
];
// install service worker
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});
// activate service worker
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
// fetch from server
self.addEventListener("fetch", (evt) => {
  //console.log("service worker is fetching", evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});
