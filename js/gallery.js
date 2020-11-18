'use strict';

(function () {
  let bigPicture = document.querySelector(`.big-picture`);

  // Функция для создания DOM элемента по шаблону
  let createPhotoDOMElement = function (template, photo) {
    let pictureTemplate = template.cloneNode(true);

    pictureTemplate.querySelector(`.picture__img`).src = photo.url;
    pictureTemplate.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureTemplate.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return pictureTemplate;
  };

  // Функция для создания блока комментария
  let createCommentDOMElement = function (template, comment) {
    let commentTemplate = template.cloneNode(true);

    commentTemplate.querySelector(`.social__picture`).src = comment.avatar;
    commentTemplate.querySelector(`.social__picture`).alt = comment.name;
    commentTemplate.querySelector(`.social__text`).textContent = comment.message;

    return commentTemplate;
  };

  let closeModal = function () {
    bigPicture.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
  };

  let escPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeModal();
    }
  };

  // Добавляет массив фотографий в разметку
  let appendPhotos = function (photos) {
    let documentFragment = document.createDocumentFragment(photos);

    photos.forEach(function (photo) {
      let pictureTemplate = document.querySelector(`#picture`).content;
      let pictureDOM = createPhotoDOMElement(pictureTemplate, photo);
      documentFragment.append(pictureDOM);
    });

    document.querySelector(`.pictures`).appendChild(documentFragment);

    let littlePictures = document.querySelectorAll(`a.picture`);

    littlePictures.forEach(function (littlePicture) {
      littlePicture.addEventListener(`click`, function () {
        bigPicture.classList.remove(`hidden`);
        document.querySelector(`body`).classList.add(`modal-open`);
        document.addEventListener(`keydown`, escPress);

        let littlePictureUrl = littlePicture.querySelector(`.picture__img`).getAttribute(`src`);
        let littlePictureData = photos.find((photo) => photo.url === littlePictureUrl);

        bigPicture.querySelector(`.big-picture__img > img`).src = littlePictureData.url;
        bigPicture.querySelector(`.likes-count`).textContent = littlePictureData.likes;
        bigPicture.querySelector(`.comments-count`).textContent = littlePictureData.comments.length;
        bigPicture.querySelector(`.social__caption`).textContent = littlePictureData.description;

        let documentFragmentComment = document.createDocumentFragment();

        littlePictureData.comments.forEach(function (comment) {
          let commentTemplate = document.querySelector(`#comment`).content;
          let commentDOM = createCommentDOMElement(commentTemplate, comment);
          documentFragmentComment.append(commentDOM);
        });

        document.querySelector(`.social__comments`).appendChild(documentFragmentComment);

        bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
        bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
      });
    });

    let bigPictureCancel = document.querySelector(`.big-picture__cancel`);

    bigPictureCancel.addEventListener(`click`, closeModal);
  };

  // Очистка блока .pictures от фотографий
  let clearPhotos = function () {
    let photos = document.querySelectorAll(`.picture`);
    photos.forEach(function (photo) {
      photo.remove();
    });
  };

  window.gallery = {
    appendPhotos,
    clearPhotos
  };
})();
