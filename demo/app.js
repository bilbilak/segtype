window.__SEGTYPE_READY__ = import(`../dist/segtype.mjs?v=${Date.now()}`).then(m => {
  m.defineSeg();
  return m;
});
