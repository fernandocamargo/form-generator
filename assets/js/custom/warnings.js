define(function (require) {
  var core = (function () {}).prototype;

  return Object.assign(core, {
    create: function (error) {
      console.group('***', error.name, '***');
      console.warn(error.message);
      console.groupEnd();
      return this;
    },

    appendTo: function () {
      return this;
    }
  });
});