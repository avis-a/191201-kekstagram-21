'use strict';

(function () {
  let URL = `https://21.javascript.pages.academy/kekstagram`;

  window.upload = function (data, onResult) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onResult(xhr);
    });

    xhr.addEventListener(`error`, function () {
      onResult(xhr);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
