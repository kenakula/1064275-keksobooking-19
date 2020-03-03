'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_PINS_COUNT_ON_MAP = 5;

  var adForm = document.querySelector('.ad-form');
  var formFields = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');
  var map = document.querySelector('.map');
  var mapArea = map.querySelector('.map__pins');
  var mainPin = mapArea.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select, fieldset');

  var successHandler = function (data) {
    window.dataPins = data;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

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

  var onFilterFormChange = window.debounce(function (evt) {
    var select = evt.target;

    if (select) {
      updatePins();
    }

  });

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

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (it) {
      fragment.appendChild(setPin(it));
    });

    mapArea.appendChild(fragment);
  };

  var updatePins = function () {
    var filteredPins = window.filterPins(window.dataPins);
    clearPins();
    renderPins(filteredPins.slice(0, MAX_PINS_COUNT_ON_MAP));
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    activateFilters();
    renderPins(window.dataPins.slice(0, MAX_PINS_COUNT_ON_MAP));
    adForm.classList.remove('ad-form--disabled');
    changeFormFieldsState(formFields, false);
  };

  addressInput.value = getCoordinates(mainPin);

  changeFormFieldsState(formFields, true);

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinPress);

  filterForm.addEventListener('change', onFilterFormChange);

  window.backend.load(successHandler, errorHandler);

})();
