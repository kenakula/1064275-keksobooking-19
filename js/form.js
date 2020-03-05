'use strict';

(function () {
  var NOT_FOR_RESIDENCE_ROOMS_NUMBER = '100';

  var adForm = document.querySelector('.ad-form');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var roomCapacitySelect = adForm.querySelector('#capacity');
  var titleInput = adForm.querySelector('#title');

  var getTitleInputMessage = function () {
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
    var message = getTitleInputMessage();
    titleInput.setCustomValidity(message);
  };

  roomCapacitySelect.addEventListener('change', onRoomCapacitySelectChange);
  roomNumberSelect.addEventListener('change', onRoomCapacitySelectChange);

  titleInput.addEventListener('change', onTitleInputChange);
})();


