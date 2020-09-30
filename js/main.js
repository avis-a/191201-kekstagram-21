'use strict'

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var createComments = function () {
  let commentsRandom = [];

  let randomCommentsCount = getRandomInt(1, 5);
  for (let i = 0; i < randomCommentsCount; i++) {
    commentsRandom[i] = {
      avatar: `img/avatar-${getRandomInt(1, 10)}.svg`,
      message: commentsArray[getRandomInt(0, commentsArray.length - 1)],
      name: namesArray[getRandomInt(0, namesArray.length - 1)],
    }
  }

  return commentsRandom;
}

var generateRandomPhotos = function () {
  let array = [];

  for (var i = 0; i < 25; i++) {
    array[i] = {
      url: `photos/${i}.jpg`,
      description: 'test',
      likes: getRandomInt(15, 200),
      comments: createComments()
    }
  }
  return array;
};

// Функция для создания DOM элемента по шаблону
var createPhotoDOMElement = function (template, photo) {
  var pictureTemplate = template.cloneNode(true);

  pictureTemplate.querySelector('.picture__img').src = photo.url;
  pictureTemplate.querySelector('.picture__likes').textContent = photo.likes;
  pictureTemplate.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureTemplate;
}

// Добавляет массив фотографий в разметку
var appendPhotos = function (photoArray) {
  let pictures = document.querySelector('.pictures');
  let photos = generateRandomPhotos();

  for (var photo of photoArray) {
    var pictureTemplate = document.querySelector('#picture').content;
    var pictureDOM = createPhotoDOMElement(pictureTemplate, photo);
    pictures.appendChild(pictureDOM);
  }
}

let photos = generateRandomPhotos();
appendPhotos(photos);
