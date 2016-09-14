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
        DOM.create('input', {
          name: settings.name,
          id: settings.name,
          type: settings.type,
          required: !!settings.required,
          placeholder: settings.placeholder,
          maxLength: 255,
          className: Utils.CSS('input')
        })
      ];
    }
  });
});
