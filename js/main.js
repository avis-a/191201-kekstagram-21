'use strict';

var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var namesArray = [
  'Артём',
  'Вася',
  'Коля',
  'Настя',
  'Аня',
  'Даша'
];

const COMMENTS = {
  min: 1,
  max: 5,
};

const LIKES = {
  min: 15,
  max: 200,
};

const COUNT_PHOTOS = 25;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var createComments = function () {
  let commentsRandom = [];

  let randomCommentsCount = getRandomInt(COMMENTS.min, COMMENTS.max);
  for (let i = 0; i < randomCommentsCount; i++) {
    commentsRandom.push({
      avatar: `img/avatar-${getRandomInt(1, 10)}.svg`,
      message: commentsArray[getRandomInt(0, commentsArray.length - 1)],
      name: namesArray[getRandomInt(0, namesArray.length - 1)],
    });
  }

  return commentsRandom;
};

var generateRandomPhotos = function () {
  let photos = [];

  for (var i = 0; i < COUNT_PHOTOS; i++) {
    photos[i] = {
      url: `photos/${i + 1}.jpg`,
      description: 'test',
      likes: getRandomInt(LIKES.min, LIKES.max),
      comments: createComments()
    };
  }
  return photos;
};

// Функция для создания DOM элемента по шаблону
var createPhotoDOMElement = function (template, photo) {
  var pictureTemplate = template.cloneNode(true);

  pictureTemplate.querySelector('.picture__img').src = photo.url;
  pictureTemplate.querySelector('.picture__likes').textContent = photo.likes;
  pictureTemplate.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureTemplate;
};

// Добавляет массив фотографий в разметку
var appendPhotos = function (photos) {
  let documentFragment = document.createDocumentFragment(photos);

  photos.forEach(function (photo) {
    var pictureTemplate = document.querySelector('#picture').content;
    var pictureDOM = createPhotoDOMElement(pictureTemplate, photo);
    documentFragment.append(pictureDOM);
  });

  document.querySelector('.pictures').appendChild(documentFragment);
};

let photos = generateRandomPhotos();
appendPhotos(photos);

// Загрузка изображения и показ формы редактирования
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var uploadOverlay = document.querySelector('.img-upload__overlay');

var hashtagInput = document.querySelector('.text__hashtags');

uploadFile.onchange = function () {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', escPress);
};

let closeModal = function () {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

uploadCancel.onclick = function () {
  closeModal();
};

var escPress = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== hashtagInput) {
    evt.preventDefault();
    closeModal();
  }
};

// Применение эффекта для изображения
var effects = document.querySelectorAll('.effects__radio');
var imgPreview = document.querySelector('.img-upload__preview');
var effectLevel = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');

const EFFECT_VALUES = {
  'chrome': {
    min: 0,
    max: 1,
    getFilter(value) {
      return `grayscale(${value})`;
    }
  },
  'sepia': {
    min: 0,
    max: 1,
    getFilter(value) {
      return `sepia(${value})`;
    }
  },
  'marvin': {
    min: 0,
    max: 100,
    getFilter(value) {
      return `invert(${value}%)`;
    }
  },
  'phobos': {
    min: 0,
    max: 3,
    getFilter(value) {
      return `blur(${value}px)`;
    }
  },
  'heat': {
    min: 1,
    max: 3,
    getFilter(value) {
      return `brightness(${value})`;
    }
  },
};

let effectsIntensive = function (effect) {
  if (effect.value !== 'none') {
    let min = EFFECT_VALUES[effect.value].min;
    let max = EFFECT_VALUES[effect.value].max;
    let result = min + ((max - min) / 100 * effectLevelValue.value);
    imgPreview.style = 'filter: ' + EFFECT_VALUES[effect.value].getFilter(result);
  } else {
    imgPreview.style = null;
  }
};

effects.forEach(function (effect) {
  effect.onchange = function () {
    imgPreview.classList = null;
    imgPreview.classList.add('img-upload__preview');
    imgPreview.classList.add('effects__preview--' + effect.value);

    effectLevelValue.value = 100;
    effectsIntensive(effect);
  };
});

effectLevel.mouseup = function () {
  let effect = document.querySelector('input[name=effect]:checked');
  effectsIntensive(effect);
};

// Редактирование размера изображения
var controlSmaller = document.querySelector('.scale__control--smaller');
var controlBigger = document.querySelector('.scale__control--bigger');
var controlValue = document.querySelector('.scale__control--value');
controlValue.value = '100%';

const ZOOM_STEP = 25;

const ZOOM_LIMITS = {
  min: 25,
  max: 100
};

controlSmaller.onclick = function () {
  let percentNumber = Number(controlValue.value.replace('%', ''));
  percentNumber -= ZOOM_STEP;

  if (percentNumber >= ZOOM_LIMITS.min) {
    controlValue.value = percentNumber + '%';
    imgPreview.style = `transform: scale(${percentNumber / 100})`;
  }
};

controlBigger.onclick = function () {
  let percentNumber = Number(controlValue.value.replace('%', ''));
  percentNumber += ZOOM_STEP;

  if (percentNumber <= ZOOM_LIMITS.max) {
    controlValue.value = percentNumber + '%';
    imgPreview.style = `transform: scale(${percentNumber / 100})`;
  }
};

// Валидация хеш-тегов

const re = /^#[A-я\d]*$/;

hashtagInput.addEventListener(`input`, function () {
  let hashtags = hashtagInput.value.split(' ').filter((x) => x !== '');

  if (hashtags.length === 0) {
    return;
  } else if (hashtags.length > 5) {
    hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов.');
    return;
  }

  for (var hashtag of hashtags) {
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

