'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 300;

  window.util = {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    debounce: (cb) => {
      let lastTimeout = null;

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
