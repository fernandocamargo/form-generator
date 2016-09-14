define(function (require) {
  var Strings = require('../strings');
  var Utils = require('../utils');
  var DOM = require('../dom');
  var core = (function () {}).prototype;
  var private = {
    renderCheckbox: function (stack, value, index) {
      var name = [this.name, index].join('-');
      var item = DOM.create('li', {
        className: Utils.CSS('item', Strings.slugify(value))
      });
      var input = DOM.create('input', {
        name: this.name,
        id: name,
        value: value,
        className: Utils.CSS('input'),
        required: this.required,
        type: 'checkbox'
      });
      var label = DOM.create('label', {
        innerHTML: value,
        htmlFor: name,
        className: Utils.CSS('title')
      });
      DOM.append(item, [input, label]);
      return stack.concat(item.outerHTML);
    }
  };

  return Object.assign(core, {
    render: function (settings) {
      var renderCheckbox = private.renderCheckbox.bind(settings);
      var values = Object.keys(settings.values);
      var checkboxes = values.reduce(renderCheckbox, '');
      return [
        DOM.create('p', {
          innerHTML: settings.label,
          className: Utils.CSS('title')
        }),
        DOM.create('ul', {
          innerHTML: checkboxes,
          className: Utils.CSS('collection')
        })
      ];
    }
  });
});
