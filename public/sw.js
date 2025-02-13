if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let r = {};
    const t = (e) => n(e, c),
      o = { module: { uri: c }, exports: r, require: t };
    s[c] = Promise.all(a.map((e) => o[e] || t(e))).then((e) => (i(...e), r));
  };
}
define(['./workbox-00a24876'], function (e) {
  'use strict';
  importScripts('fallback-TOLGMyWuSN1MfBhbo84BZ.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/4bd1b696-4eb59b9589efeebe.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/517-e8e1e6038904cea3.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/666-1fadd2846ff303ea.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-102e7bc674ed2ec8.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/app/layout-f23e65df3bacbff2.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/app/offline/page-4dc84efc2ae0791f.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/app/page-181b206f1afaffb8.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/framework-6b27c2b7aa38af2d.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/main-9edb93cc32c2f6dc.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/main-app-88dad48ec35fda02.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/pages/_app-d23763e3e6c904ff.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-3c939423c9155df1.js',
          revision: 'TOLGMyWuSN1MfBhbo84BZ',
        },
        {
          url: '/_next/static/css/18ff5d7df4c03fb2.css',
          revision: '18ff5d7df4c03fb2',
        },
        {
          url: '/_next/static/css/7c49a7354edab34d.css',
          revision: '7c49a7354edab34d',
        },
        {
          url: '/assets/podrida.png',
          revision: 'a4e48a017eb9e164ace048167b8a1f28',
        },
        { url: '/favicon.png', revision: 'a4e48a017eb9e164ace048167b8a1f28' },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        {
          url: '/fonts/Jaro-Regular-VariableFont_opsz.ttf',
          revision: 'c7a597ee3c4e7296cdccf7efa328e91b',
        },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        {
          url: '/icons/icon-192x192.png',
          revision: 'bcedf9722c63552e6746369ab6f681b1',
        },
        {
          url: '/icons/icon-512x512.png',
          revision: '72d57cf4700ae61b4e5be3c41283cc78',
        },
        { url: '/manifest.json', revision: 'b5b63f2425b3abcd4efc6883256b825f' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/offline', revision: 'TOLGMyWuSN1MfBhbo84BZ' },
        {
          url: '/screenshots/screenshot1.png',
          revision: '533c3b1255ff5d2a36053d6f4aa3b82b',
        },
        {
          url: '/screenshots/screenshot2.png',
          revision: '3629cac2f89a9611df26efdd300dbe05',
        },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js|css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-css-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json)$/i,
      new e.NetworkFirst({
        cacheName: 'static-json-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    );
});
