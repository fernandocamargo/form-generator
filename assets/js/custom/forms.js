define(function (require) {
  var Utils = require('./utils');
  var Assertions = require('./assertions');
  var Conversions = require('./conversions');
  var Strings = require('./strings');
  var Requests = require('./requests');
  var DOM = require('./dom');
  var Fields = require('./fields');
  var core = (function () {}).prototype;
  var private = {
    createForm: function (form, data) {
      return Object
        .keys(data)
        .reduce(private.createFieldset.bind(this, data), form);
    },

    createFieldset: function (groups, form, group, index) {
      var fields = groups[group];
      var first = !index;
      var className = Utils.CSS('fieldset', group, {active: first});
      var fieldset = DOM.create('fieldset', {className: className});
      private.createLegend.call(fieldset, group);
      private.createFields.call(fieldset, fields);
      private.createButton.call(fieldset, this.buttons[index]);
      DOM.append(form, fieldset);
      return form;
    },

    createLegend: function (text) {
      var legend = DOM.create('legend', {
        innerHTML: text,
        className: Utils.CSS('title')
      });
      return DOM.append(this, legend);
    },

    createFields: function (fields) {
      return fields.forEach(private.createField.bind(this));
    },

    createField: function (data) {
      var name = Strings.slugify(data.name);
      var className = Utils.CSS('field', data.type, data.field, name);
      var container = DOM.create('div', {className: className});
      var field = Fields[data.field].render(data);
      DOM.append(container, field);
      return DOM.append(this, container);
    },

    createButton: function (settings) {
      var container = DOM.create('div', {
        className: Utils.CSS('control', 'submit'),
      });
      var button = DOM.create('input', {
        className: Utils.CSS('input'),
        type: (settings.type || 'submit'),
        value: (settings.value || 'Enviar')
      });
      DOM.append(container, button);
      return DOM.append(this, container);
    },

    getFormDefaults: function (instance) {
      var identity = ['form', instance.index].join('-');
      return {
        name: identity,
        id: identity,
        noValidate: true,
        className: Utils.CSS('form')
      };
    },

    findCurrentFieldset: function (stack, fieldset, index) {
      var isRequired = Assertions.isRequired;
      var willValidate = Assertions.willValidate;
      var isInvalid = Assertions.isInvalid;
      var filters = [isRequired, willValidate, isInvalid];
      var verifiable = DOM.find(this[index], {filters: filters});
      var invalids = verifiable.filter(Assertions.hasLength);
      var avoid = (!Assertions.isBoolean(stack) || !invalids.length);
      private.toggleCurrentFieldset(fieldset);
      return (avoid ? stack : index);
    },

    toggleCurrentFieldset: function (fieldset, status) {
      var method = (status ? 'add' : 'remove');
      return (!!fieldset ? fieldset.classList[method]('active') : fieldset);
    },

    submitForm: function (event) {
      var hasClass = Assertions.hasClass.bind('field');
      var form = (event.currentTarget || event.target);
      var fieldsets = DOM.find(form);
      var fields = DOM.find(fieldsets, {filters: hasClass});
      var findCurrentFieldset = private.findCurrentFieldset.bind(fields);
      var current = fieldsets.reduce(findCurrentFieldset, false);
      var invalid = Assertions.isNumber(current);
      var handler = (invalid ? event.preventDefault.bind(event) : Utils.avoid);
      private.toggleCurrentFieldset(fieldsets[current], true);
      return handler();
    },

    instances: []
  };

  return Object.assign(core, {
    loadFromJSON: function (url) {
      var instance = {
        index: private.instances.length,
        promise: Requests.get(url),
        url: url
      };
      var index = (private.instances.push(instance) - 1);
      return Object.assign({}, this, {instance: private.instances[index]});
    },

    formatData: function (handler) {
      var format = (Assertions.isFunction(handler) ? handler : Utils.avoid);
      var promise = this.instance.promise.then(format.bind(this.instance));
      var instance = Object.assign(this.instance, {promise: promise});
      return Object.assign(this, {instance: instance});
    },

    createForm: function (settings) {
      var defaults = private.getFormDefaults(this.instance);
      var form = DOM.create('form', defaults, settings);
      var create = private.createForm.bind(settings, form);
      var promise = this.instance.promise.then(create);
      var instance = Object.assign(this.instance, {promise: promise});
      DOM.subscribe(form, {submit: private.submitForm.bind(settings)})
      return Object.assign(this, {instance: instance});
    },

    appendTo: function (element) {
      var append = DOM.append.bind(DOM, element);
      var promise = this.instance.promise.then(append);
      var instance = Object.assign(this.instance, {promise: promise});
      return Object.assign(this, {instance: instance});
    },

    onError: function (handler) {
      var fail = (Assertions.isFunction(handler) ? handler : Utils.avoid);
      var promise = this.instance.promise.catch(fail.bind(this.instance));
      var instance = Object.assign(this.instance, {promise: promise});
      return Object.assign(this, {instance: instance});
    }
  });
});
