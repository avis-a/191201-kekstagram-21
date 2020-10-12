'use strict';
(function () {
  // Загрузка изображения и показ формы редактирования
  let uploadFile = document.querySelector('#upload-file');
  let uploadCancel = document.querySelector('#upload-cancel');
  let uploadOverlay = document.querySelector('.img-upload__overlay');

  let hashtagInput = document.querySelector('.text__hashtags');

  uploadFile.addEventListener('change', function () {
    uploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', escPress);
  });

  let closeModal = function () {
    uploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  uploadCancel.addEventListener('click', function () {
    closeModal();
  });

  let escPress = function (evt) {
    if (evt.key === 'Escape' && document.activeElement !== hashtagInput) {
      evt.preventDefault();
      closeModal();
    }
  };
})();
