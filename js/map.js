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
    renderPins(window.dataPins.slice(0, MAX_PINS_COUNT_ON_MAP));
    activateFilters();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onMainPinClick = function () {
    var inactive = map.classList.contains('map--faded');

    if (inactive) {
      activatePage();
    }

  };

  var onMainPinPress = function (evt) {
    var inactive = map.classList.contains('map--faded');
    if (evt.key === KEY_ENTER && inactive) {
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
    var index = window.dataPins.indexOf(dataPin);

    pinElement.setAttribute('data-index', index);
    pinElement.style.left = dataPin.location.x - (PIN_WIDTH / 2) + 'px';
    pinElement.style.top = dataPin.location.y - PIN_HEIGHT + 'px';
    pinElement.addEventListener('click', window.card.onOfferPinClick);
    img.src = dataPin.author.avatar;
    img.alt = dataPin.offer.title;

    return pinElement;
  };

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {

      if (!data[i].offer) {
        continue;
      }

      fragment.appendChild(setPin(data[i]));
    }

    mapArea.appendChild(fragment);
  };

  var updatePins = function () {
    var filteredPins = window.filterPins(window.dataPins);
    window.card.closeCard();
    window.util.clearPins(mapArea);
    renderPins(filteredPins.slice(0, MAX_PINS_COUNT_ON_MAP));
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.backend.load(successHandler, errorHandler);
    adForm.classList.remove('ad-form--disabled');
    window.util.changeFormFieldsState(formFields, false);
    window.writeAddress();
  };

  addressInput.value = window.util.getPinCoordinatesString(mainPin, window.constants.mainPinWidth, window.constants.mainPinHeight);

  window.util.changeFormFieldsState(formFields, true);

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinPress);

  filterForm.addEventListener('change', onFilterFormChange);

})();
