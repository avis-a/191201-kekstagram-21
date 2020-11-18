'use strict';

(function () {
  const SERVER_URL = `https://21.javascript.pages.academy/kekstagram/data`;

  const onError = (message) => {
    let errorTemplate = document.querySelector(`#server-error`).content;
    errorTemplate.querySelector(`.server-error__title`).textContent = message;
    document.querySelector(`main`).appendChild(errorTemplate);

    let closeButton = document.querySelector(`.server-error__button`);

    closeButton.addEventListener(`click`, () => {
      document.querySelector(`.server-error`).remove();
    });
  };

  const onSuccess = (data) => {
    window.gallery.appendPhotos(data);

    document.querySelector(`.img-filters`).classList.remove(`img-filters--inactive`);
    window.filter.handleFilterButtons(data);
  };

  window.load(SERVER_URL, onSuccess, onError);
})();
