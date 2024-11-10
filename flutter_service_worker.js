'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "3c7f46cb47f5b3a7be3f4ff7a63633f7",
"version.json": "c6a6bcaaaa90feab63022eb54a79d8e8",
"index.html": "10a21f5c80a656939281259a27e84f42",
"/": "10a21f5c80a656939281259a27e84f42",
"main.dart.js": "1e41a761e0152d16ef9e6e72a2a3815b",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"favicon.png": "10da8acfa9c614ae1d8f874b9e385e51",
"site.webmanifest": "44fe19b82676cc49550804ef880e2e3e",
"icons/favicon-16x16.png": "10da8acfa9c614ae1d8f874b9e385e51",
"icons/safari-pinned-tab.svg": "1c6c1924c086714bcfe2abe7a9d8dbd6",
"icons/favicon.ico": "c8309d960e85e2c720d7c658ae7e02f5",
"icons/android-chrome-192x192.png": "0cf08e438ebb94a9b61e50fb19a33637",
"icons/apple-touch-icon.png": "41c85d40e0f88c4711968cfa1ffce029",
"icons/android-chrome-256x256.png": "114408bc6084d399a0d833b827525908",
"icons/mstile-150x150.png": "0390b901a34fc4d933a8bdeba8fbaa7d",
"icons/favicon-32x32.png": "d56c152ecc27d7f175295072687d7e21",
"manifest.json": "644f5742adbce5a455173bdb8c40db80",
"assets/AssetManifest.json": "f002028e23a296a1f85c2c0910a367c2",
"assets/NOTICES": "a177e5db096f3446ac8a54742438b3b4",
"assets/FontManifest.json": "418395f243a9caa32a29830c9da8bda1",
"assets/AssetManifest.bin.json": "1a0f20d273eef34397e1b2837d569758",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "391ff5f9f24097f4f6e4406690a06243",
"assets/packages/wakelock_plus/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "c0bfcd90410d6ce1f910ac1ec1445e79",
"assets/fonts/MaterialIcons-Regular.otf": "56f29fde7305c92c85bb7ffc903fd784",
"assets/assets/grieft_logo_mobile.png": "9daa7667596cc3f7e51c14b18bf95160",
"assets/assets/policies/tos.html": "f39eed25a96102848ca118a0f578d2d7",
"assets/assets/policies/privacy.html": "f798bc432b9208a2da282081fc0e8f97",
"assets/assets/grieft_image.png": "2abd1c3b600ef489ed1e1ff7ccdf522f",
"assets/assets/grieft_logo.svg": "33019eae28832aa7e43acfa6334c3722",
"assets/assets/gradient_background.png": "04cc647fc7d6eb5d150123edbe92c9cc",
"assets/assets/parallax_1.png": "5b97f82d5f34af97bbc05cda41b97165",
"assets/assets/parallax_2.png": "e9cf9d87d22216b962a25e0d8183783d",
"assets/assets/grieft_logo.png": "dca34c72e4a6a286ad530aa8d19fec1d",
"assets/assets/fonts/FreightDispProMedium_Regular.ttf": "646c476b2bced73dc571883e7c4f298b",
"assets/assets/fonts/ProximaNova_Light.ttf": "f65a2d7d4f360293cf031799964a9fc3",
"assets/assets/fonts/FreightDispProSemibold-Regular.ttf": "5fe6d9bc888349ffb2f945e68364212f",
"assets/assets/fonts/ProximaNova_Regular.ttf": "1fc524a22c99e8d63393ecfe238e3d35",
"assets/assets/fonts/FreightDispProSemibold_Italic.ttf": "4f38bc737572f6fcad9296387bbb49a6",
"assets/assets/fonts/FreightDispProMedium_Italic.ttf": "7628bc895b469ed6c857c3b3ac95ce2b",
"browserconfig.xml": "a493ba0aa0b8ec8068d786d7248bb92c",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
