// install service worker
self.addEventListener("install", (evt) => {
  console.log("service worker has been installed");
});
// activate service worker
self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
});
// fetch from server
self.addEventListener("fetch", (evt) => {
  console.log("service worker is fetching", evt);
});
