define(function (require) {
  var Utils = require('../utils');
  var DOM = require('../dom');
  var core = (function () {}).prototype;

  return Object.assign(core, {
    render: function (settings) {
      return [
        DOM.create('label', {
          innerHTML: settings.label,
          htmlFor: settings.name,
          className: Utils.CSS('title')
        }),
        DOM.create('textarea', {
          name: settings.name,
          id: settings.name,
          required: !!settings.required,
          placeholder: settings.placeholder,
          className: Utils.CSS('input')
        })
      ];
    }
  });
});
