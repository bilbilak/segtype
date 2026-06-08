// Path: ../dist/segtype.js resolves from demo/ to root dist/ during dev.
// CI/CD flattens demo/ to site root and replaces this with ./dist/.
window.__SEGTYPE_READY__ = import(`../dist/segtype.js?v=${Date.now()}`).then(m => {
  m.defineSeg();
  return m;
});
