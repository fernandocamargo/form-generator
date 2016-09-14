define(function () {
  var core = (function () {}).prototype;

  return Object.assign(core, {
    isFunction: function (object) {
      return (typeof object === 'function');
    },

    isString: function (object) {
      return (typeof object === 'string');
    },

    isNumber: function (object) {
      return (typeof object === 'number');
    },

    isArray: function (object) {
      return Array.isArray(object);
    },

    isBoolean: function (object) {
      return (typeof object === 'boolean');
    },

    hasClass: function (element) {
      return element.classList.contains(this);
    },

    isRequired: function (element) {
      return !!element.required;
    },

    willValidate: function (element) {
      return !!element.willValidate;
    },

    hasLength: function (object) {
      return !!object.length;
    },

    isInvalid: function (element) {
      return !element.checkValidity();
    }
  });
});
