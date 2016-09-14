define(function (require) {
  var Assertions = require('./assertions');
  var Conversions = require('./conversions');
  var core = (function () {}).prototype;
  var private = {
    addEventListener: function (element, type) {
      return element.addEventListener(type, this[type]);
    },

    getNodes: function (stack, element) {
      var getNodes = private.getNodes.bind(this);
      var collection = Conversions.objectToArray(element[this]);
      var recursive = !!collection.length;
      var nodes = (!recursive ? element : children.reduce(getNodes, []));
      return stack.concat(nodes);
    },

    applyFilter: function (status, filter) {
      return (status ? filter(this) : status);
    },

    checkFilters: function (element) {
      return this.reduce(private.applyFilter.bind(element), true);
    },

    filterBy: function (elements, filters) {
      return elements.filter(private.checkFilters.bind(filters));
    },

    find: function (element) {
      var all = (this.all || false);
      var hasFilters = !!this.filters;
      var hasMultipleFilters = Assertions.isArray(this.filters);
      var preserveFilters = (!hasFilters || hasMultipleFilters);
      var filters = (preserveFilters ? this.filters : [this.filters]);
      var find = private.getNodes.bind('children');
      var collection = Conversions.objectToArray(element.children || []);
      var children = (!!all ? collection.reduce(find, []) : collection);
      return (!filters ? children : private.filterBy(children, filters));
    }
  };

  return Object.assign(core, {
    create: function () {
      var tag = (arguments[0] || 'div');
      var element = document.createElement(tag);
      var attributes = Conversions.objectToArray(arguments).slice(1);
      return Object.assign.apply(Object, [element].concat(attributes));
    },

    append: function (parent, children) {
      var append = parent.appendChild.bind(parent);
      var elements = (Assertions.isArray(children) ? children : [children]);
      return (!children ? parent : elements.map(append));
    },

    subscribe: function (element, events) {
      var addEventListener = private.addEventListener.bind(events, element);
      var listeners = Object.keys(events).map(addEventListener);
      return element;
    },

    find: function (elements, options) {
      var multiple = Assertions.isArray(elements);
      var collection = (multiple ? elements : [elements]);
      var children = collection.map(private.find.bind(options || {}));
      return (multiple ? children : children[0]);
    }
  });
});
