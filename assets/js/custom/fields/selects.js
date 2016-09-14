define(function (require) {
  var Strings = require('../strings');
  var Utils = require('../utils');
  var DOM = require('../dom');
  var core = (function () {}).prototype;
  var private = {
    renderOption: function (stack, value) {
      var values = (this.values || {});
      var option = DOM.create('option', {
        value: (values[value] || ''),
        innerHTML: value,
        className: Utils.CSS('option', Strings.slugify(value))
      });
      return stack.concat(option.outerHTML);
    }
  };

  return Object.assign(core, {
    render: function (settings) {
      var renderOption = private.renderOption.bind(settings);
      var placeholder = private.renderOption('', settings.mask);
      var values = Object.keys(settings.values);
      var options = values.reduce(renderOption, '');
      return [
        DOM.create('label', {
          innerHTML: settings.label,
          htmlFor: settings.name,
          className: Utils.CSS('title')
        }),
        DOM.create('select', {
          name: settings.name,
          id: settings.name,
          required: !!settings.required,
          innerHTML: placeholder.concat(options),
          className: Utils.CSS('input')
        })
      ];
    }
  });
});
