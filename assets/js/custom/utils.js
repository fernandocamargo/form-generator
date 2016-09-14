define(function (require) {
  var Assertions = require('./assertions');
  var Conversions = require('./conversions');
  var core = (function () {}).prototype;
  var private = {
    CSS: function (stack, resource) {
      var isString = Assertions.isString(resource);
      var isArray = Assertions.isArray(resource);
      var avoid = (isString || isArray);
      var fragment = (avoid ? resource : Conversions.objectToString(resource));
      return stack.concat(fragment);
    }
  };

  return Object.assign(core, {
    avoid: function () {
      return;
    },

    CSS: function () {
      var resources = Conversions.objectToArray(arguments);
      return resources.reduce(private.CSS, []).join(' ').trim();
    }
  });
});
