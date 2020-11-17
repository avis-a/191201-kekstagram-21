'use strict';

(function () {
  const STEP_COUNT = 5;

  const serverUrl = `https://21.javascript.pages.academy/kekstagram/data`;
  let bigPicture = document.querySelector(`.big-picture`);
  let bigPictureCancel = document.querySelector(`.big-picture__cancel`);

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
    document.querySelector(`body`).classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, escPress);
    bigPictureCancel.removeEventListener(`click`, closeModal);
  };

  const escPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeModal();
    }
  };

  const onError = (message) => {
    let errorTemplate = document.querySelector(`#server-error`).content;
    errorTemplate.querySelector(`.server-error__title`).textContent = message;
    document.querySelector(`body`).appendChild(errorTemplate);


    let closeButton = document.querySelector(`.server-error__button`);

    closeButton.addEventListener(`click`, () => {
      document.querySelector(`.server-error`).remove();
    });
  };

  const onSuccess = (data) => {
    window.gallery.appendPhotos(data);

    document.querySelector(`.img-filters`).classList.remove(`img-filters--inactive`);
    window.filter.handleFilterButtons(data);

    let littlePictures = document.querySelectorAll(`a.picture`);

    littlePictures.forEach((littlePicture) => {
      littlePicture.addEventListener(`click`, () => {
        bigPicture.classList.remove(`hidden`);
        document.querySelector(`body`).classList.add(`modal-open`);
        document.addEventListener(`keydown`, escPress);
        bigPictureCancel.addEventListener(`click`, closeModal);

        let littlePictureUrl = littlePicture.querySelector(`.picture__img`).getAttribute(`src`);
        let littlePictureData = data.find((photo) => photo.url === littlePictureUrl);

        let comentsParrent = document.querySelector(`.social__comments`);
        document.querySelectorAll(`.social__comment`).forEach((comment) => {
          comentsParrent.removeChild(comment);
        });

        littlePictureData.currentCommentsCount = 0;
        bigPicture.querySelector(`.comments-loader`).classList.remove(`hidden`);

        const loadMoreComments = () => {
          let range = littlePictureData.comments.slice(littlePictureData.currentCommentsCount, littlePictureData.currentCommentsCount + STEP_COUNT);
          littlePictureData.currentCommentsCount += range.length;

          if (littlePictureData.currentCommentsCount >= littlePictureData.comments.length) {
            bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
          }

          let documentFragment = document.createDocumentFragment();

          range.forEach((comment) => {
            let commentTemplate = document.querySelector(`#comment`).content;
            let commentDOM = createCommentDOMElement(commentTemplate, comment);
            documentFragment.append(commentDOM);
          });

          document.querySelector(`.social__comments`).appendChild(documentFragment);

          bigPicture.querySelector(`.comments-view-count`).textContent = littlePictureData.currentCommentsCount;
        };

        bigPicture.querySelector(`.big-picture__img > img`).src = littlePictureData.url;
        bigPicture.querySelector(`.likes-count`).textContent = littlePictureData.likes;
        bigPicture.querySelector(`.comments-count`).textContent = littlePictureData.comments.length;
        bigPicture.querySelector(`.social__caption`).textContent = littlePictureData.description;

        loadMoreComments();

        bigPicture.querySelector(`.comments-loader`).addEventListener(`click`, loadMoreComments);
      });
    });
  };

  window.load(serverUrl, onSuccess, onError);
})();
