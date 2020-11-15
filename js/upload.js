'use strict';

(function () {
  let URL = `https://21.javascript.pages.academy/kekstagram`;

  window.upload = (data, onResult) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      onResult(xhr);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
