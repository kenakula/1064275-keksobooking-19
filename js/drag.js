'use strict';

(function () {
  var MAIN_PIN_TAIL = 17;
  var MIN_PIN_MIN_TOP_POSITION = 130;
  var MIN_PIN_MAX_TOP_POSITION = 630;

  var map = document.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');


  var dragLimits = {
    top: MIN_PIN_MIN_TOP_POSITION - window.constants.mainPinWidth - MAIN_PIN_TAIL,
    right: map.offsetWidth - mainPin.offsetWidth / 2,
    bottom: MIN_PIN_MAX_TOP_POSITION - window.constants.mainPinHeight - MAIN_PIN_TAIL,
    left: map.offsetLeft - mainPin.offsetWidth / 2
  };

  var getMainPinCoordinates = function () {
    var left = mainPin.offsetLeft;
    var top = mainPin.offsetTop;

    return {
      x: left + window.constants.mainPinWidth / 2,
      y: top + window.constants.mainPinHeight + MAIN_PIN_TAIL,
    };
  };

  window.writeAddress = function () {
    var coordinates = getMainPinCoordinates();
    addressInput.value = Math.floor(coordinates.x) + ', ' + Math.floor(coordinates.y);
  };

  var restrainPin = function () {
    if (mainPin.offsetLeft + window.constants.mainPinWidth / 2 > map.offsetWidth) {
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
      window.writeAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        window.writeAddress();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDown);

})();
