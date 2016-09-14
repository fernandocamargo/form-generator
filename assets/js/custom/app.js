require.config({
  urlArgs: ['anticache=', new Date().getTime()].join('')
});

define(function (require) {
  var Conversions = require('./conversions');
  var Strings = require('./strings');
  var Forms = require('./forms');
  var Warnings = require('./warnings');
  var resource = './assets/json/fields.json';
  var container = document.getElementById('app');
  var form = {
    action: '//httpbin.org/post',
    method: 'post',
    buttons: [
      {value: 'Continuar'},
      {value: 'Buscar profissionais'}
    ]
  };

  var getTranslation = function (object) {
    var multiple = !!object.allow_multiple_value;
    return {
      type: {
        small_text: 'text',
        phone: 'tel'
      },
      field: {
        inputs: !!~['small_text', 'email', 'phone'].indexOf(object.type),
        textareas: (object.type === 'big_text'),
        selects: ((object.type === 'enumerable') && !multiple),
        checkboxes: ((object.type === 'enumerable') && multiple),
        maps: (object.type === 'lat_lng')
      }
    };
  };

  var translate = function (object) {
    var dictionary = getTranslation(object);
    var type = (dictionary.type[object.type] || object.type);
    var field = Conversions.objectToString(dictionary.field)[0];
    return Object.assign(object, {
      name: object.name,
      type: Strings.slugify(type),
      field: Strings.slugify(field)
    });
  };

  var connect = function (stack, key) {
    stack[Strings.slugify(key)] = this[key].map(translate);
    return stack;
  };

  var adapter = function (data) {
    var embedded = data._embedded;
    return Object.keys(embedded).reduce(connect.bind(embedded), {});
  };

  var showError = function (error) {
    return Warnings.create(error).appendTo(container);
  };

  return Forms
    .loadFromJSON(resource)
    .formatData(adapter)
    .createForm(form)
    .appendTo(container)
    .onError(showError);
});
