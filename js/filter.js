'use strict';

(function () {

  // Функция для сравнения фотографий по кол-ву комментариев
  const comparePhotos = (a, b) => {
    return a.comments.length - b.comments.length;
  };

  // Фильтрация фотографий
  const filterPhotos = (dataArray, filterId) => {
    let resultPhotos = [];
    switch (filterId) {
      case `filter-random`:
        let randomIndexes = [];
        let randomElementCount = dataArray.length >= 10 ? 10 : dataArray.length;
        for (let i = 0; i < randomElementCount;) {
          let randomIndex = window.util.getRandomInt(0, dataArray.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
            i++;
          }
        }

        randomIndexes.forEach((randomIndex) => {
          resultPhotos.push(dataArray[randomIndex]);
        });

        break;
      case `filter-discussed`:
        resultPhotos = Array.from(dataArray).sort(comparePhotos).reverse();
        break;
      default:
        resultPhotos = Array.from(dataArray);
        break;
    }
    return resultPhotos;
  };

  const handleFilterButtons = (data) => {
    const filterButtons = document.querySelectorAll(`.img-filters__button`);
    for (let filterButton of filterButtons) {
      filterButton.addEventListener(`click`, () => {
        const currentActiveButton = document.querySelector(`.img-filters__button--active`);
        if (currentActiveButton.id === filterButton.id) {
          return;
        }

        window.util.debounce(() => {
          currentActiveButton.classList.remove(`img-filters__button--active`);
          filterButton.classList.add(`img-filters__button--active`);

          window.gallery.clearPhotos();
          const resultPhotos = filterPhotos(data, filterButton.id);
          window.gallery.appendPhotos(resultPhotos);
        })();
      });
    }
  };

  window.filter = {
    filterPhotos,
    handleFilterButtons
  };
})();
