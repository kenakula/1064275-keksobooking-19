'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var adForm = document.querySelector('.ad-form');
  var formFields = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');
  var map = document.querySelector('.map');
  var mapArea = map.querySelector('.map__pins');
  var mainPin = mapArea.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select, fieldset');
  var housingFeatures = filterForm.querySelector('#housing-features');
  var featuresInputs = housingFeatures.querySelectorAll('input');

  var housingTypeSelect = filterForm.querySelector('#housing-type');
  var housingPriceSelect = filterForm.querySelector('#housing-price');
  var housingRoomsSelect = filterForm.querySelector('#housing-rooms');
  var housingGuestsSelect = filterForm.querySelector('#housing-guests');

  // деактивирует поле ввода
  var changeFormFieldsState = function (data, boolean) {
    for (var i = 0; i < data.length; i++) {
      data[i].disabled = boolean;
    }
  };

  var getCoordinates = function (pin) {
    var posX = pin.offsetLeft - (PIN_WIDTH / 2);
    var posY = pin.offsetTop - PIN_HEIGHT;

    return posX + ', ' + posY;
  };

  var onMainPinClick = function () {
    activatePage();
  };

  var onMainPinPress = function (evt) {
    if (evt.key === KEY_ENTER) {
      activatePage();
    }
  };

  var activateFilters = function () {
    if (window.dataPins) {
      filterSelects.forEach(function (it) {
        it.disabled = false;
      });
    }
  };

  var setPin = function (dataPin) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');

    pinElement.style.left = dataPin.location.x - (PIN_WIDTH / 2) + 'px';
    pinElement.style.top = dataPin.location.y - PIN_HEIGHT + 'px';
    img.src = dataPin.author.avatar;
    img.alt = dataPin.offer.title;

    return pinElement;
  };

  var clearPins = function () {
    var offerPins = mapArea.querySelectorAll('.map__pin:not(.map__pin--main)');

    offerPins.forEach(function (it) {
      mapArea.removeChild(it);
    });
  };

  var filterPins = function () {
    var newPins = window.dataPins;
    var features = window.util.getSelectedFeaturesList();

    if (housingTypeSelect.value !== 'any') {
      newPins = window.filter.houseType(newPins);
    }

    newPins = window.filter.housePrice(newPins);
    newPins = window.filter.houseRooms(newPins);
    newPins = window.filter.houseGuests(newPins);

    if (features.length > 0) {
      newPins = window.filter.featuresFilter(newPins);
    }

    return newPins.slice(0, 5);
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    var pins = filterPins();

    pins.forEach(function (it) {
      fragment.appendChild(setPin(it));
    });

    mapArea.appendChild(fragment);
  };

  var updatePins = function () {
    clearPins();
    renderPins();
  };

  // активирует страницу
  var activatePage = function () {
    map.classList.remove('map--faded');
    activateFilters();
    renderPins(window.dataPins.slice(0, 5));
    adForm.classList.remove('ad-form--disabled');
    changeFormFieldsState(formFields, false);
  };

  addressInput.value = getCoordinates(mainPin);

  changeFormFieldsState(formFields, true);

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinPress);

  housingTypeSelect.addEventListener('change', updatePins);
  housingPriceSelect.addEventListener('change', updatePins);
  housingRoomsSelect.addEventListener('change', updatePins);
  housingGuestsSelect.addEventListener('change', updatePins);

  featuresInputs.forEach(function (it) {
    it.addEventListener('change', updatePins);
  });

})();
