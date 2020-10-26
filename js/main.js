'use strict';

(function () {
  const serverUrl = `https://21.javascript.pages.academy/kekstagram/data`;

  // Функция для создания DOM элемента по шаблону
  let createCommentDOMElement = function (template, comment) {
    let commentTemplate = template.cloneNode(true);

    commentTemplate.querySelector(`.social__picture`).src = comment.avatar;
    commentTemplate.querySelector(`.social__picture`).alt = comment.name;
    commentTemplate.querySelector(`.social__text`).textContent = comment.message;

    return commentTemplate;
  };

  let onError = function (message) {
    let errorTemplate = document.querySelector(`#server-error`).content;
    errorTemplate.querySelector(`.server-error__title`).textContent = message;
    document.querySelector(`body`).appendChild(errorTemplate);


    let closeButton = document.querySelector(`.server-error__button`);

    closeButton.addEventListener(`click`, function () {
      document.querySelector(`.server-error`).remove();
    });
  };

  let onSuccess = function (data) {
    window.gallery.appendPhotos(data);

    document.querySelector(`.img-filters`).classList.remove(`img-filters--inactive`);
    window.filter.handleFilterButtons(data);

    let littlePictures = document.querySelectorAll(`a.picture`);
    let bigPicture = document.querySelector(`.big-picture`);

    littlePictures.forEach(function (littlePicture) {
      littlePicture.addEventListener(`click`, function () {
        bigPicture.classList.remove(`hidden`);
        let littlePictureUrl = littlePicture.querySelector(`.picture__img`).getAttribute(`src`);
        let littlePictureData = data.find((photo) => photo.url === littlePictureUrl);

        bigPicture.querySelector(`.big-picture__img > img`).src = littlePictureData.url;
        bigPicture.querySelector(`.likes-count`).textContent = littlePictureData.likes;
        bigPicture.querySelector(`.comments-count`).textContent = littlePictureData.comments.length;
        bigPicture.querySelector(`.social__caption`).textContent = littlePictureData.description;

        let documentFragment = document.createDocumentFragment();

        littlePictureData.comments.forEach(function (comment) {
          let commentTemplate = document.querySelector(`#comment`).content;
          let commentDOM = createCommentDOMElement(commentTemplate, comment);
          documentFragment.append(commentDOM);
        });

        document.querySelector(`.social__comments`).appendChild(documentFragment);

        bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
        bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);

        document.querySelector(`body`).classList.add(`modal-open`);
      });
    });
  };

  window.load(serverUrl, onSuccess, onError);
})();
