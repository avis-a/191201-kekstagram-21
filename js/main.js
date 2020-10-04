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
      url: `photos/${i}.jpg`,
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
