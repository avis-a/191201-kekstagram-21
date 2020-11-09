'use strict';

(function () {
  // Загрузка изображения и показ формы редактирования
  let uploadFile = document.querySelector(`#upload-file`);
  let uploadCancel = document.querySelector(`#upload-cancel`);
  let uploadOverlay = document.querySelector(`.img-upload__overlay`);

  let hashtagInput = document.querySelector(`.text__hashtags`);
  let commentTextarea = document.querySelector(`.text__description`);
  let form = document.querySelector(`.img-upload__form`);

  uploadFile.addEventListener(`change`, function () {
    uploadOverlay.classList.remove(`hidden`);

    resetForm();

    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape` && document.activeElement !== hashtagInput && document.activeElement !== commentTextarea) {
        evt.preventDefault();
        closeModal();
      }
    });

    // Валидация поля комментарий
    commentTextarea.addEventListener(`input`, function () {
      let comment = commentTextarea.value;
      commentTextarea.setCustomValidity(``);

      if (comment.length >= 140) {
        commentTextarea.setCustomValidity(`Комментарий не может составлять больше 140 символов.`);
      }
      commentTextarea.reportValidity();
    });
  });

  let onUploadResult = function (operationStatus) {
    let template = document.querySelector(`#${operationStatus}`).content;
    document.querySelector(`body`).appendChild(document.importNode(template, true));

    let closeButton = document.querySelector(`.${operationStatus}__button`);

    closeButton.addEventListener(`click`, function () {
      document.querySelector(`.${operationStatus}`).remove();
    });

    document.querySelector(`.${operationStatus}`).addEventListener(`click`, function (e) {
      let modalWindow = document.querySelector(`.${operationStatus}__inner`);
      if (e.target !== modalWindow) {
        e.preventDefault();
        document.querySelector(`.${operationStatus}`).remove();
      }
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape` && document.querySelector(`.${operationStatus}`)) {
        evt.preventDefault();
        document.querySelector(`.${operationStatus}`).remove();
      }
    });
  };

  let resetForm = function () {
    document.getElementById(`effect-none`).checked = true;
    window.preview.effectApply(document.querySelector(`input[name="effect"]:checked`));

    window.preview.resetSliderToDefalt();
    document.querySelector(`.scale__control--value`).value = `100%`;
    hashtagInput.value = ``;
    commentTextarea.value = ``;
  };

  let closeModal = function () {
    uploadOverlay.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
  };

  uploadCancel.addEventListener(`click`, function () {
    closeModal();
  });

  form.addEventListener(`submit`, function (evt) {
    window.upload(new FormData(form), function (response) {
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
