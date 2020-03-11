'use strict';

(function () {
  var clearPins = function (area) {
    var offerPins = area.querySelectorAll('.map__pin:not(.map__pin--main)');

    offerPins.forEach(function (it) {
      area.removeChild(it);
    });
  };

  var getPinCoordinatesString = function (pin, pinWidth, pinHeight) {
    var posX = pin.offsetLeft + (pinWidth / 2);
    var posY = pin.offsetTop + (pinHeight / 2);

    return Math.round(posX) + ', ' + Math.round(posY);
  };

  var checkFilesForTypeMatches = function (elem, types) {
    var file = elem.files[0];
    var fileName = file.name.toLowerCase();

    return types.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var changeFormFieldsState = function (data, boolean) {
    data.forEach(function (it) {
      it.disabled = boolean;
    });
  };

  var changeCheckboxState = function (elem) {
    elem.checked = elem.checked ? false : true;
  };

  var removeElement = function (elem, container) {
    if (elem) {
      container.removeChild(elem);
    }
  };

  window.util = {
    clearPins: clearPins,
    getPinCoordinatesString: getPinCoordinatesString,
    checkFilesForTypeMatches: checkFilesForTypeMatches,
    changeFormFieldsState: changeFormFieldsState,
    changeCheckboxState: changeCheckboxState,
    removeElement: removeElement,
  };

})();
