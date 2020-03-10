'use strict';

(function () {
  var MAX_OFFER_PRICE = 1000000;
  var NOT_FOR_RESIDENCE_ROOMS_NUMBER = '100';

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var priceInput = adForm.querySelector('#price');
  var houseTypeSelect = adForm.querySelector('#type');
  var titleInput = adForm.querySelector('#title');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var roomCapacitySelect = adForm.querySelector('#capacity');

  var getPriceInputErrorMessage = function () {
    var price = priceInput.value;

    if (price > MAX_OFFER_PRICE) {
      return 'Цена предложения не должна быть более ' + MAX_OFFER_PRICE;
    }

    return '';
  };

  var getHouseTypeErrorMessage = function () {
    var houseType = houseTypeSelect.value;
    var price = priceInput.value;

    if (houseType === 'flat' && price < window.constants.MinPrice.FLAT) {
      return 'Цена за ночь для квартиры должна быть не меньше ' + window.constants.MinPrice.FLAT;
    }

    if (houseType === 'house' && price < window.constants.MinPrice.HOUSE) {
      return 'Цена за ночь для дома должна быть не меньше ' + window.constants.MinPrice.HOUSE;
    }

    if (houseType === 'palace' && price < window.constants.MinPrice.PALACE) {
      return 'Цена за ночь для дворца должна быть не меньше ' + window.constants.MinPrice.PALACE;
    }

    return '';
  };

  var getTitleInputErrorMessage = function () {
    var title = titleInput.value;
    var min = titleInput.getAttribute('min');
    var max = titleInput.getAttribute('max');

    if (title.length < min) {
      return 'Заголовок предложения должен содержать не менее 30 символов';
    }

    if (title.length > max) {
      return 'Заголовок предложения должен содержать не более 100 символов';
    }

    return '';
  };

  var getRoomNumberSelectErrorMessage = function () {
    var roomsNumber = roomNumberSelect.value;
    var guestsNumber = roomCapacitySelect.value;

    if (roomsNumber === NOT_FOR_RESIDENCE_ROOMS_NUMBER && guestsNumber !== '0') {
      return 'не для проживания';
    }

    if (roomsNumber === NOT_FOR_RESIDENCE_ROOMS_NUMBER && guestsNumber === '0') {
      return '';
    }

    if (roomsNumber < guestsNumber) {
      return 'нужно больше комнат для гостей';
    } else if (guestsNumber === '0') {
      return 'неверно';
    }

    return '';
  };

  var setPhotoErrorMessage = function (evt, chooser) {
    var matches = window.util.fileMatches(evt.target, FILE_TYPES);

    if (matches) {
      var message = '';
    } else {
      message = 'Выберите подходящий формат изображения';
    }

    chooser.setCustomValidity(message);
  };

  window.validation = {
    getPriceInputErrorMessage: getPriceInputErrorMessage,
    getHouseTypeErrorMessage: getHouseTypeErrorMessage,
    getTitleInputErrorMessage: getTitleInputErrorMessage,
    getRoomNumberSelectErrorMessage: getRoomNumberSelectErrorMessage,
    setPhotoErrorMessage: setPhotoErrorMessage,
  };

})();
