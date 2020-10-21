'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 300;

  window.util = {
    getRandomInt: function (min, max) {
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
