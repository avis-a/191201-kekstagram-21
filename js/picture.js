'use strict';
(function () {

  const ZOOM_STEP = 25;

  const ZOOM_LIMITS = {
    min: 25,
    max: 100
  };

  const HASHTAGS_LENGTH = 5;

  const RE = /^#[A-я\d]*$/;

  let imgPreview = document.querySelector(`.img-upload__preview`);

  let hashtagInput = document.querySelector(`.text__hashtags`);

  // Редактирование размера изображения
  let controlSmaller = document.querySelector(`.scale__control--smaller`);
  let controlBigger = document.querySelector(`.scale__control--bigger`);
  let controlValue = document.querySelector(`.scale__control--value`);

  controlSmaller.addEventListener(`click`, () => {
    let percentNumber = Number(controlValue.value.replace(`%`, ``));
    percentNumber -= ZOOM_STEP;

    if (percentNumber >= ZOOM_LIMITS.min) {
      controlValue.value = percentNumber + `%`;
      imgPreview.style = `transform: scale(${percentNumber / 100})`;
    }
  });

  controlBigger.addEventListener(`click`, () => {
    let percentNumber = Number(controlValue.value.replace(`%`, ``));
    percentNumber += ZOOM_STEP;

    if (percentNumber <= ZOOM_LIMITS.max) {
      controlValue.value = percentNumber + `%`;
      imgPreview.style = `transform: scale(${percentNumber / 100})`;
    }
  });

  // Валидация хеш-тегов
  hashtagInput.addEventListener(`input`, () => {
    let hashtags = hashtagInput.value.split(` `).filter((x) => x !== ``);

    if (hashtags.length === 0) {
      return;
    } else if (hashtags.length > HASHTAGS_LENGTH) {
      hashtagInput.setCustomValidity(`Нельзя указать больше ${HASHTAGS_LENGTH} хэш-тегов.`);
      hashtagInput.reportValidity();
      return;
    }

    for (let hashtag of hashtags) {
      if (hashtag === `#`) {
        hashtagInput.setCustomValidity(`Хэштег не может состоять только из одной решётки.`);
      } else if (!hashtag.startsWith(`#`)) {
        hashtagInput.setCustomValidity(`Хэштег должен начинаться с символа # (решётка).`);
      } else if (hashtag.length >= 20) {
        hashtagInput.setCustomValidity(`Максимальная длина одного хэш-тега 20 символов, включая решётку.`);
      } else if (hashtags.filter((x) => x.toLowerCase() === hashtag.toLowerCase()).length > 1) {
        hashtagInput.setCustomValidity(`Такой хэштег уже есть.`);
      } else if (!RE.test(hashtag)) {
        hashtagInput.setCustomValidity(`Значение не может содержать спец. символы`);
      } else {
        hashtagInput.setCustomValidity(``);
      }
    }
    hashtagInput.reportValidity();
  });
})();
