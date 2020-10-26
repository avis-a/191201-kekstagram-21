'use strict';

(function () {

  let commentsArray = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];

  let namesArray = [
    `Артём`,
    `Вася`,
    `Коля`,
    `Настя`,
    `Аня`,
    `Даша`
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

  window.data = {
    createComments() {
      let commentsRandom = [];

      let randomCommentsCount = window.util.getRandomInt(COMMENTS.min, COMMENTS.max);
      for (let i = 0; i < randomCommentsCount; i++) {
        commentsRandom.push({
          avatar: `img/avatar-${window.util.getRandomInt(1, 10)}.svg`,
          message: commentsArray[window.util.getRandomInt(0, commentsArray.length - 1)],
          name: namesArray[window.util.getRandomInt(0, namesArray.length - 1)],
        });
      }

      return commentsRandom;
    },

    generateRandomPhotos() {
      let photos = [];

      for (let i = 0; i < COUNT_PHOTOS; i++) {
        photos[i] = {
          url: `photos/${i + 1}.jpg`,
          description: `test`,
          likes: window.util.getRandomInt(LIKES.min, LIKES.max),
          comments: window.data.createComments()
        };
      }
      return photos;
    },
  };
})();
