'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.util = {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    debounce: function (cb) {
      let lastTimeout = null;

      return function (...parameters) {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb(...parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
