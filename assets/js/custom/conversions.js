define(function () {
  var core = (function () {}).prototype;
  var private = {
    objectFilter: function (key) {
      return !!this[key];
    }
  };

  return Object.assign(core, {
    objectToString: function (object) {
      var objectFilter = private.objectFilter.bind(object);
      var string = Object.keys(object).filter(objectFilter);
      return (string || []);
    },

    objectToArray: function (object) {
      return Array.prototype.slice.call(object);
    }
  });
});
