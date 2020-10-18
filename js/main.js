'use strict';

(function () {
  const serverUrl = 'https://21.javascript.pages.academy/kekstagram/data';

  let onError = function (message) {
    let errorTemplate = document.querySelector('#server-error').content;
    errorTemplate.querySelector('.server-error__title').textContent = message;
    document.querySelector('body').appendChild(errorTemplate);


    let closeButton = document.querySelector('.server-error__button');

    closeButton.addEventListener('click', function () {
      document.querySelector('.server-error').remove();
    });
  };

  let onSuccess = function (data) {
    window.gallery.appendPhotos(data);

    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    window.gallery.handleFilterButtons(data);
  };

  window.load(serverUrl, onSuccess, onError);
})();
