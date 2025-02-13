(() => {
  'use strict';
  self.fallback = async (e) =>
    'document' === e.destination
      ? caches.match('/offline', { ignoreSearch: !0 })
      : Response.error();
})();
