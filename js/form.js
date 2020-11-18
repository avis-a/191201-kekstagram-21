'use strict';

(function () {
  // Загрузка изображения и показ формы редактирования
  let uploadFile = document.querySelector(`#upload-file`);
  let uploadCancel = document.querySelector(`#upload-cancel`);
  let uploadOverlay = document.querySelector(`.img-upload__overlay`);

  let hashtagInput = document.querySelector(`.text__hashtags`);
  let commentTextarea = document.querySelector(`.text__description`);
  let form = document.querySelector(`.img-upload__form`);

  const closeModal = () => {
    uploadOverlay.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);

    uploadCancel.removeEventListener(`click`, closeModal);
    document.removeEventListener(`keydown`, escPress);
  };

  const escPress = (evt) => {
    if (evt.key === `Escape` && document.activeElement !== hashtagInput && document.activeElement !== commentTextarea) {
      evt.preventDefault();
      closeModal();
    }
  };

  uploadFile.addEventListener(`change`, () => {
    uploadOverlay.classList.remove(`hidden`);

    resetForm();

    document.querySelector(`body`).classList.add(`modal-open`);
    uploadCancel.addEventListener(`click`, closeModal);
    document.addEventListener(`keydown`, escPress);

    // Валидация поля комментарий
    commentTextarea.addEventListener(`input`, () => {
      let comment = commentTextarea.value;
      commentTextarea.setCustomValidity(``);

      if (comment.length >= 141) {
        commentTextarea.setCustomValidity(`Комментарий не может составлять больше 140 символов.`);
      }
      commentTextarea.reportValidity();
    });
  });

  const onUploadResult = (operationStatus) => {
    let template = document.querySelector(`#${operationStatus}`).content;
    document.querySelector(`main`).appendChild(document.importNode(template, true));

    let closeButton = document.querySelector(`.${operationStatus}__button`);
    let modalElement = document.querySelector(`.${operationStatus}`);

    const closeButtonClickHandler = (evt) => {
      evt.preventDefault();
      modalElement.remove();

      closeButton.removeEventListener(`click`, closeButtonClickHandler);
      modalElement.removeEventListener(`click`, closeButtonByEmptyArea);
      document.removeEventListener(`keydown`, closeButtonByEscape);
    };

    const closeButtonByEmptyArea = (evt) => {
      let modalWindow = document.querySelector(`.${operationStatus}__inner`);
      if (evt.target !== modalWindow) {
        evt.preventDefault();
        modalElement.remove();

        closeButton.removeEventListener(`click`, closeButtonClickHandler);
        modalElement.removeEventListener(`click`, closeButtonByEmptyArea);
        document.removeEventListener(`keydown`, closeButtonByEscape);
      }
    };

    const closeButtonByEscape = (evt) => {
      if (evt.key === `Escape` && document.querySelector(`.${operationStatus}`)) {
        evt.preventDefault();
        modalElement.remove();

        closeButton.removeEventListener(`click`, closeButtonClickHandler);
        modalElement.removeEventListener(`click`, closeButtonByEmptyArea);
        document.removeEventListener(`keydown`, closeButtonByEscape);
      }
    };

    closeButton.addEventListener(`click`, closeButtonClickHandler);
    document.querySelector(`.${operationStatus}`).addEventListener(`click`, closeButtonByEmptyArea);
    document.addEventListener(`keydown`, closeButtonByEscape);
  };

  const resetForm = () => {
    document.querySelector(`#effect-none`).checked = true;
    window.preview.effectApply(document.querySelector(`input[name="effect"]:checked`));

    window.preview.resetSliderToDefalt();
    document.querySelector(`.scale__control--value`).value = `100%`;
    hashtagInput.value = ``;
    commentTextarea.value = ``;
  };

  form.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(form), (response) => {
      let statusTitle = `error`;

      if (response.status === 200) {
        statusTitle = `success`;
      }

      onUploadResult(statusTitle);
      closeModal();
    });
    evt.preventDefault();
  });
})();
