'use strict';
(function () {
  let sliderPin = document.querySelector(`.effect-level__pin`);
  let sliderLine = document.querySelector(`.effect-level__line`);
  let sliderDepth = document.querySelector(`.effect-level__depth`);
  let effectLevelValue = document.querySelector(`.effect-level__value`);

  sliderPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let sliderWidth = sliderLine.offsetWidth;

    let startCoords = {
      x: evt.clientX
    };

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      let pixelOffset = sliderPin.offsetLeft - shift.x;

      if (pixelOffset < 0 || pixelOffset > sliderWidth) {
        return;
      }

      sliderPin.style.left = pixelOffset + `px`;
      let percentOfLine = pixelOffset / sliderWidth * 100;
      let rounded = Math.round(percentOfLine);
      sliderDepth.style.width = rounded + `%`;

      effectLevelValue.value = rounded;

      let effect = document.querySelector(`input[name=effect]:checked`);
      window.picture.effectsIntensive(effect);
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
