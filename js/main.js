'use strict';

// const photos = window.data.generateRandomPhotos();
// window.gallery.appendPhotos(photos);

(function () {
  var onError = function () {
    // console.error(message);
  };

  var onSuccess = function (data) {
    window.gallery.appendPhotos(data);
  };

  window.load('https://21.javascript.pages.academy/kekstagram/data', onSuccess, onError);
})();
