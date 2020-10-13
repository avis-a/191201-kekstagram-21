'use strict';

(function () {
  // Функция для создания DOM элемента по шаблону
  let createPhotoDOMElement = function (template, photo) {
    let pictureTemplate = template.cloneNode(true);

    pictureTemplate.querySelector('.picture__img').src = photo.url;
    pictureTemplate.querySelector('.picture__likes').textContent = photo.likes;
    pictureTemplate.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureTemplate;
  };

  // Добавляет массив фотографий в разметку
  let appendPhotos = function (photos) {
    let documentFragment = document.createDocumentFragment(photos);

    photos.forEach(function (photo) {
      let pictureTemplate = document.querySelector('#picture').content;
      let pictureDOM = createPhotoDOMElement(pictureTemplate, photo);
      documentFragment.append(pictureDOM);
    });

    document.querySelector('.pictures').appendChild(documentFragment);
  };

  window.gallery = {
    appendPhotos
  };
})();
