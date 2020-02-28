'use strict';
(function () {
  var DEFAULT_FILTER_STATE = 'any';
  var MAX_HOUSE_PRICE = 50000;
  var MIN_HOUSE_PRICE = 10000;

  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = filterForm.querySelector('#housing-type');
  var housingPriceSelect = filterForm.querySelector('#housing-price');
  var housingRoomsSelect = filterForm.querySelector('#housing-rooms');
  var housingGuestsSelect = filterForm.querySelector('#housing-guests');

  window.filter = {};

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

  var houseTypeFilter = function (data) {
    var newData = data.filter(function (pin) {
      return pin.offer.type === housingTypeSelect.value;
    });

    return newData;
  };

  var housePriceFilter = function (data) {
    var newData = data.filter(function (pin) {
      var price = pin.offer.price;

      switch (housingPriceSelect.value) {
        case 'high':
          return price > MAX_HOUSE_PRICE;
        case 'low':
          return price < MIN_HOUSE_PRICE;
        default:
          return price >= MIN_HOUSE_PRICE && price <= MAX_HOUSE_PRICE;
      }

    });

    return newData;
  };

  var housingRoomsFilter = function (data) {
    var newData = data.filter(function (pin) {

      return pin.offer.rooms === parseInt(housingRoomsSelect.value, 10);
    });

    return newData;
  };

  var housingGuestsFilter = function (data) {
    var newData = data.filter(function (pin) {
      var guestsCount = pin.offer.guests;

      switch (housingGuestsSelect.value) {
        case '1':
          return guestsCount === 1;
        case '2':
          return guestsCount === 2;
        default:
          return guestsCount > 6;
      }

    });

    return newData;
  };

  var featuresFilter = function (data) {
    var selectedFeatures = window.util.getSelectedFeaturesList();
    var newData = data.filter(function (pin) {
      return selectedFeatures.every(function (it) {
        return pin.offer.features.includes(it);
      });
    });

    return newData;
  };

  window.filter.filterPins = function () {
    var newPins = window.dataPins;
    var selectedFeatures = window.util.getSelectedFeaturesList();

    if (housingTypeSelect.value !== DEFAULT_FILTER_STATE) {
      newPins = houseTypeFilter(newPins);
    }

    if (housingPriceSelect.value !== DEFAULT_FILTER_STATE) {
      newPins = housePriceFilter(newPins);
    }

    if (housingRoomsSelect.value !== DEFAULT_FILTER_STATE) {
      newPins = housingRoomsFilter(newPins);
    }

    if (housingGuestsSelect.value !== DEFAULT_FILTER_STATE) {
      newPins = housingGuestsFilter(newPins);
    }

    if (selectedFeatures.length > 0) {
      newPins = featuresFilter(newPins);
    }

    return newPins;
  };

  window.backend.load(successHandler, errorHandler);

})();
