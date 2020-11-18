'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 500;
  let lastTimeout = null;

  window.util = {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    debounce: (cb) => {
      return (...parameters) => {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }

        lastTimeout = window.setTimeout(() => {
          cb(...parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
