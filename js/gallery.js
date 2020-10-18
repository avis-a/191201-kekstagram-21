'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 150;
  let lastTimeout = null;

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

  // Очистка блока .pictures от фотографий
  let clearPhotos = function () {
    let photos = document.querySelectorAll('.picture');
    photos.forEach(function (photo) {
      photo.remove();
    });
  };

  let handleFilterButtons = function (data) {
    let filterButtons = document.querySelectorAll('.img-filters__button');
    for (let filterButton of filterButtons) {
      filterButton.addEventListener('click', function () {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }

        lastTimeout = window.setTimeout(function () {
          document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
          filterButton.classList.add('img-filters__button--active');

          window.gallery.clearPhotos();
          let resultPhotos = window.data.filterPhotos(data, filterButton.id);
          window.gallery.appendPhotos(resultPhotos);

        }, DEBOUNCE_INTERVAL);
      });
    }
  };

  window.gallery = {
    appendPhotos,
    clearPhotos,
    handleFilterButtons
  };
})();
