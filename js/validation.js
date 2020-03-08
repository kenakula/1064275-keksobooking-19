'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MAX_OFFER_PRICE = 1000000;
  var NOT_FOR_RESIDENCE_ROOMS_NUMBER = '100';
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;

  var adForm = document.querySelector('.ad-form');
  var priceInput = adForm.querySelector('#price');
  var houseTypeSelect = adForm.querySelector('#type');
  var titleInput = adForm.querySelector('#title');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var roomCapacitySelect = adForm.querySelector('#capacity');

  var fileMatches = function (elem) {
    var file = elem.files[0];
    var fileName = file.name.toLowerCase();

    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var imagesChooser = function (evt, fc, chooser) {
    var matches = fileMatches(evt.target);
    var message = '';

    if (matches) {
      fc(evt);
    } else {
      message = 'Для фотографии подойдет только изображение';
    }

    chooser.setCustomValidity(message);
  };

  var avatarChooser = function (evt, fc, chooser) {
    var matches = fileMatches(evt.target);
    var message = '';

    if (matches) {
      fc(evt);
    } else {
      message = 'Для аватара подойдет только изображение';
    }

    chooser.setCustomValidity(message);
  };

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

    if (houseType === 'flat' && price < MIN_FLAT_PRICE) {
      return 'Цена за ночь для квартиры должна быть не меньшее ' + MIN_FLAT_PRICE;
    }

    if (houseType === 'house' && price < MIN_HOUSE_PRICE) {
      return 'Цена за ночь для дома должна быть не меньшее ' + MIN_HOUSE_PRICE;
    }

    if (houseType === 'palace' && price < MIN_PALACE_PRICE) {
      return 'Цена за ночь для дворца должна быть не меньшее ' + MIN_PALACE_PRICE;
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

  window.validation = {
    imagesChooser: imagesChooser,
    avatarChooser: avatarChooser,
    getPriceInputErrorMessage: getPriceInputErrorMessage,
    getHouseTypeErrorMessage: getHouseTypeErrorMessage,
    getTitleInputErrorMessage: getTitleInputErrorMessage,
    getRoomNumberSelectErrorMessage: getRoomNumberSelectErrorMessage,
  };

})();
