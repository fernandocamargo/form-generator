define(function () {
  var core = (function () {}).prototype;

  return Object.assign(core, {
    slugify: function (text) {
      return text
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[\u00C0-\u00C5]/ig, 'a')
        .replace(/[\u00C8-\u00CB]/ig, 'e')
        .replace(/[\u00CC-\u00CF]/ig, 'i')
        .replace(/[\u00D2-\u00D6]/ig, 'o')
        .replace(/[\u00D9-\u00DC]/ig, 'u')
        .replace(/[\u00D1]/ig, 'n')
        .replace(/[\u00E7]/ig, 'c')
        .replace(/_/g, '-')
        .replace(/(\?|\!)/g, '')
        .replace(/[^\w\-]+/g, '-')
        .replace(/\-\-+/g, '-');
    }
  });
});
