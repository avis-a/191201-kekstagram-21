'use strict';

(function () {
  var onError = function (message) {
    let errorTemplate = document.querySelector('#server-error').content;
    errorTemplate.querySelector('.server-error__title').textContent = message;
    document.querySelector('body').appendChild(errorTemplate);
  };

  var onSuccess = function (data) {
    window.gallery.appendPhotos(data);
  };

  window.load('https://21.javascript.pages.academy/kekstagram/data', onSuccess, onError);
})();
