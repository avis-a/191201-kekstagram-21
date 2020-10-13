'use strict';
(function () {

  const ZOOM_STEP = 25;

  const ZOOM_LIMITS = {
    min: 25,
    max: 100
  };

  const HASHTAGS_LENGTH = 5;

  const EFFECT_VALUE = 100;

  const re = /^#[A-я\d]*$/;

  // Применение эффекта для изображения
  let effects = document.querySelectorAll('.effects__radio');
  let imgPreview = document.querySelector('.img-upload__preview');
  let effectLevel = document.querySelector('.effect-level__pin');
  let effectLevelValue = document.querySelector('.effect-level__value');
  let hashtagInput = document.querySelector('.text__hashtags');

  const EFFECT_VALUES = {
    'chrome': {
      min: 0,
      max: 1,
      template: 'grayscale({value})'
    },
    'sepia': {
      min: 0,
      max: 1,
      template: 'sepia({value})'
    },
    'marvin': {
      min: 0,
      max: 100,
      template: 'invert({value}%)'
    },
    'phobos': {
      min: 0,
      max: 3,
      template: 'blur({value}px)'
    },
    'heat': {
      min: 1,
      max: 3,
      template: 'brightness({value})'
    },
  };

  let effectsIntensive = function (effect) {
    if (effect.value !== 'none') {
      let min = EFFECT_VALUES[effect.value].min;
      let max = EFFECT_VALUES[effect.value].max;
      let template = EFFECT_VALUES[effect.value].template;

      let result = min + ((max - min) / 100 * effectLevelValue.value);
      imgPreview.style = 'filter: ' + template.replace('{value}', result);
    } else {
      imgPreview.style = null;
    }
  };

  effects.forEach(function (effect) {
    effect.addEventListener('change', function () {
      imgPreview.classList = null;
      imgPreview.classList.add('img-upload__preview');
      imgPreview.classList.add('effects__preview--' + effect.value);

      effectLevelValue.value = EFFECT_VALUE;
      effectsIntensive(effect);
    });
  });

  effectLevel.addEventListener('mouseup', function () {
    let effect = document.querySelector('input[name=effect]:checked');
    effectsIntensive(effect);
  });

  // Редактирование размера изображения
  var controlSmaller = document.querySelector('.scale__control--smaller');
  var controlBigger = document.querySelector('.scale__control--bigger');
  var controlValue = document.querySelector('.scale__control--value');
  controlValue.value = '100%';

  controlSmaller.addEventListener('click', function () {
    let percentNumber = Number(controlValue.value.replace('%', ''));
    percentNumber -= ZOOM_STEP;

    if (percentNumber >= ZOOM_LIMITS.min) {
      controlValue.value = percentNumber + '%';
      imgPreview.style = `transform: scale(${percentNumber / 100})`;
    }
  });

  controlBigger.addEventListener('click', function () {
    let percentNumber = Number(controlValue.value.replace('%', ''));
    percentNumber += ZOOM_STEP;

    if (percentNumber <= ZOOM_LIMITS.max) {
      controlValue.value = percentNumber + '%';
      imgPreview.style = `transform: scale(${percentNumber / 100})`;
    }
  });

  // Валидация хеш-тегов
  hashtagInput.addEventListener('input', function () {
    let hashtags = hashtagInput.value.split(' ').filter((x) => x !== '');

    if (hashtags.length === 0) {
      return;
    } else if (hashtags.length > HASHTAGS_LENGTH) {
      hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов.');
      return;
    }

    for (let hashtag of hashtags) {
      if (hashtag === '#') {
        hashtagInput.setCustomValidity('Хэштег не может состоять только из одной решётки.');
      } else if (!hashtag.startsWith('#')) {
        hashtagInput.setCustomValidity('Хэштег должен начинаться с символа # (решётка).');
      } else if (hashtag.length >= 20) {
        hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку.');
      } else if (hashtags.filter((x) => x.toLowerCase() === hashtag.toLowerCase()).length > 1) {
        hashtagInput.setCustomValidity('Такой хэштег уже есть.');
      } else if (!re.test(hashtag)) {
        hashtagInput.setCustomValidity('Значение не может содержать спец. символы');
      } else {
        hashtagInput.setCustomValidity(``);
      }
    }
    hashtagInput.reportValidity();
  });
})();
