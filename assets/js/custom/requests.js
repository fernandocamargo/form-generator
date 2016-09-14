define(function () {
  var core = (function () {}).prototype;

  return Object.assign(core, {
    get: function (url) {
      return window
        .fetch(url, {mode: 'no-cors'})
        .then(this.checkResponse.bind(this));
    },

    getError: function (response) {
      var code = response.status;
      var status = response.statusText;
      var url = response.url;
      var message = (code + ' ' + status + ' - ' + url);
      return Object.assign(new Error(message), {name: 'Error'});
    },

    checkResponse: function (response) {
      var success = !!response.ok;
      var value = (success ? response.json() : this.getError(response));
      return (success ? Promise.resolve(value) : Promise.reject(value));
    }
  });
});