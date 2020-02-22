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
  var housingTypeSelect = filterForm.querySelector('#housing-type');

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

  var renderPins = function (pins) {

    if (housingTypeSelect.value !== 'any') {
      pins = window.filter.houseType(pins);
    }

    var fragment = document.createDocumentFragment();

    var dataCopy = pins.slice(0, 5);

    dataCopy.forEach(function (it) {
      fragment.appendChild(setPin(it));
    });

    mapArea.appendChild(fragment);
  };

  var updatePins = function () {
    clearPins();
    renderPins(window.dataPins);
  };

  // активирует страницу
  var activatePage = function () {
    map.classList.remove('map--faded');
    renderPins(window.dataPins);
    adForm.classList.remove('ad-form--disabled');
    changeFormFieldsState(formFields, false);
  };

  addressInput.value = getCoordinates(mainPin);

  changeFormFieldsState(formFields, true);

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinPress);

  housingTypeSelect.addEventListener('change', updatePins);

})();
