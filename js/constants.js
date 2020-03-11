'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  window.constants = {
    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT,
    escKey: ESC_KEY,
    enterKey: ENTER_KEY,
    MinPrice: MinPrice,
  };
})();
