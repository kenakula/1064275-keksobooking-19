'use strict';

(function () {
  var NOT_FOR_RESIDENCE_ROOMS_NUMBER = '100';
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;
  var MAX_OFFER_PRICE = 1000000;

  var adForm = document.querySelector('.ad-form');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var roomCapacitySelect = adForm.querySelector('#capacity');
  var titleInput = adForm.querySelector('#title');
  var houseTypeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var checkinTimeSelect = adForm.querySelector('#timein');
  var checkoutTimeSelect = adForm.querySelector('#timeout');

  var synchronizeCheckout = function () {
    var checkinIndex = checkinTimeSelect.selectedIndex;
    checkoutTimeSelect.options[checkinIndex].selected = true;
  };

  var synchronizeCheckin = function () {
    var checkoutIndex = checkoutTimeSelect.selectedIndex;
    checkinTimeSelect.options[checkoutIndex].selected = true;
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

  var onRoomCapacitySelectChange = function () {
    var message = getRoomNumberSelectErrorMessage();
    roomCapacitySelect.setCustomValidity(message);
  };

  var onTitleInputChange = function () {
    var message = getTitleInputErrorMessage();
    titleInput.setCustomValidity(message);
  };

  var onHouseTypeInputChange = function () {
    var message = getHouseTypeErrorMessage();
    houseTypeSelect.setCustomValidity(message);
  };

  var onPriceInputChange = function () {
    var message = getPriceInputErrorMessage();
    priceInput.setCustomValidity(message);
  };

  roomCapacitySelect.addEventListener('change', onRoomCapacitySelectChange);
  roomNumberSelect.addEventListener('change', onRoomCapacitySelectChange);

  titleInput.addEventListener('change', onTitleInputChange);

  houseTypeSelect.addEventListener('change', onHouseTypeInputChange);
  priceInput.addEventListener('change', onHouseTypeInputChange);
  priceInput.addEventListener('change', onPriceInputChange);
  checkinTimeSelect.addEventListener('change', synchronizeCheckout);
  checkoutTimeSelect.addEventListener('change', synchronizeCheckin);
})();


