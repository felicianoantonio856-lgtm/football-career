Excelente. 🔥 Agora faltam apenas dois ficheiros para preparar a aplicação como PWA.

Passo 4 — Criar manifest.json

No GitHub:

Add file → Create new file

Nome:

manifest.json

Cola:

writing{variant="document" id="57320"}

{
  "name": "Football Career",
  "short_name": "Football Career",
  "description": "Aplicativo para acompanhar e desenvolver uma carreira futebolística.",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#f2f6f3",
  "theme_color": "#087443",
  "lang": "pt"
}

writing{variant="document" id="57320"}
```json
{
  "name": "Football Career",
  "short_name": "Football Career",
  "description": "Aplicativo para acompanhar e desenvolver uma carreira futebolística.",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#f2f6f3",
  "theme_color": "#087443",
  "lang": "pt"
}
```Depois toca em Commit changes.

Passo 5 — Criar sw.js

Novamente:

Add file → Create new file

Nome:

sw.js

Cola:

writing{variant="document" id="64192"}

const CACHE_NAME = "football-career-v1";

const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});

writing{variant="document" id="64192"}
```javascript
const CACHE_NAME = "football-career-v1";

const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
```Depois toca em Commit changes.

Agora verifica o repositório

Deves ter:

football-career/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── sw.js
└── README.md

⚠️ Ainda não vamos ao PWABuilder. Primeiro precisamos garantir que o index.html está ligado ao manifest.json e ao sw.js.

Quando terminares o sw.js, responde “Feito” e fazemos essa última configuração.

