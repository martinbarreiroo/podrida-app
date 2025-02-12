module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{js,css,html,json,png,svg,ico}'],
  swDest: 'public/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
