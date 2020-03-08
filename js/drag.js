'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  var MIN_PIN_TOP_POSITION = 130;
  var MIN_PIN_BOTTOM_POSITION = 630;

  var map = document.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');


  var dragLimits = {
    top: MIN_PIN_TOP_POSITION - MAIN_PIN_HEIGHT,
    right: map.offsetWidth - mainPin.offsetWidth / 2,
    bottom: MIN_PIN_BOTTOM_POSITION - MAIN_PIN_HEIGHT,
    left: map.offsetLeft - mainPin.offsetWidth / 2
  };

  var getMainPinCoordinates = function () {
    var left = mainPin.offsetLeft;
    var top = mainPin.offsetTop;

    return {
      x: left + MAIN_PIN_WIDTH / 2,
      y: top + MAIN_PIN_HEIGHT,
    };
  };

  var writeAddress = function () {
    var coordinates = getMainPinCoordinates();
    addressInput.value = Math.round(coordinates.x) + ', ' + Math.round(coordinates.y);
  };

  var restrainPin = function () {
    if (mainPin.offsetLeft + MAIN_PIN_WIDTH / 2 > map.offsetWidth) {
      mainPin.style.left = dragLimits.right + 'px';
    }

    if (mainPin.offsetLeft < dragLimits.left) {
      mainPin.style.left = dragLimits.left + 'px';
    }

    if (mainPin.offsetTop < dragLimits.top) {
      mainPin.style.top = dragLimits.top + 'px';
    }

    if (mainPin.offsetTop > dragLimits.bottom) {
      mainPin.style.top = dragLimits.bottom + 'px';
    }
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    var isDragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      restrainPin();
      writeAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        writeAddress();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDown);

})();
