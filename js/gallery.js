'use strict';

(function () {
  const STEP_COUNT = 5;
  let bigPicture = document.querySelector(`.big-picture`);
  let bigPictureCancel = document.querySelector(`.big-picture__cancel`);

  // Функция для создания DOM элемента по шаблону
  const createPhotoDOMElement = (template, photo) => {
    let pictureTemplate = template.cloneNode(true);

    pictureTemplate.querySelector(`.picture__img`).src = photo.url;
    pictureTemplate.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureTemplate.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return pictureTemplate;
  };

  // Функция для создания блока комментария
  const createCommentDOMElement = (template, comment) => {
    let commentTemplate = template.cloneNode(true);

    commentTemplate.querySelector(`.social__picture`).src = comment.avatar;
    commentTemplate.querySelector(`.social__picture`).alt = comment.name;
    commentTemplate.querySelector(`.social__text`).textContent = comment.message;

    return commentTemplate;
  };

  const closeModal = () => {
    bigPicture.classList.add(`hidden`);
    document.querySelector(`main`).classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, escPress);
    bigPictureCancel.removeEventListener(`click`, closeModal);
  };

  const escPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeModal();
    }
  };

  // Добавляет массив фотографий в разметку
  const appendPhotos = (photos) => {
    let documentFragment = document.createDocumentFragment(photos);

    photos.forEach((photo) => {
      let pictureTemplate = document.querySelector(`#picture`).content;
      let pictureDOM = createPhotoDOMElement(pictureTemplate, photo);
      documentFragment.append(pictureDOM);
    });

    document.querySelector(`.pictures`).appendChild(documentFragment);

    let littlePictures = document.querySelectorAll(`a.picture`);

    let littlePictureData = {};

    const loadMoreComments = () => {
      let range = littlePictureData.comments.slice(littlePictureData.currentCommentsCount, littlePictureData.currentCommentsCount + STEP_COUNT);
      littlePictureData.currentCommentsCount += range.length;

      if (littlePictureData.currentCommentsCount >= littlePictureData.comments.length) {
        bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
      }

      let documentFragmentComment = document.createDocumentFragment();

      range.forEach((comment) => {
        let commentTemplate = document.querySelector(`#comment`).content;
        let commentDOM = createCommentDOMElement(commentTemplate, comment);
        documentFragmentComment.append(commentDOM);
      });

      document.querySelector(`.social__comments`).appendChild(documentFragmentComment);

      bigPicture.querySelector(`.comments-view-count`).textContent = littlePictureData.currentCommentsCount;
    };

    littlePictures.forEach((littlePicture) => {
      littlePicture.addEventListener(`click`, () => {
        bigPicture.querySelector(`.comments-loader`).removeEventListener(`click`, loadMoreComments);
        bigPicture.classList.remove(`hidden`);
        document.querySelector(`body`).classList.add(`modal-open`);
        document.addEventListener(`keydown`, escPress);
        bigPictureCancel.addEventListener(`click`, closeModal);

        let littlePictureUrl = littlePicture.querySelector(`.picture__img`).getAttribute(`src`);
        littlePictureData = photos.find((photo) => photo.url === littlePictureUrl);

        let comentsParrent = document.querySelector(`.social__comments`);
        document.querySelectorAll(`.social__comment`).forEach((comment) => {
          comentsParrent.removeChild(comment);
        });

        littlePictureData.currentCommentsCount = 0;
        bigPicture.querySelector(`.comments-loader`).classList.remove(`hidden`);

        bigPicture.querySelector(`.big-picture__img > img`).src = littlePictureData.url;
        bigPicture.querySelector(`.likes-count`).textContent = littlePictureData.likes;
        bigPicture.querySelector(`.comments-count`).textContent = littlePictureData.comments.length;
        bigPicture.querySelector(`.social__caption`).textContent = littlePictureData.description;

        loadMoreComments();

        bigPicture.querySelector(`.comments-loader`).addEventListener(`click`, loadMoreComments);
      });
    });
  };

  // Очистка блока .pictures от фотографий
  const clearPhotos = () => {
    let photos = document.querySelectorAll(`.picture`);
    photos.forEach((photo) => {
      photo.remove();
    });
  };

  window.gallery = {
    appendPhotos,
    clearPhotos
  };
})();
