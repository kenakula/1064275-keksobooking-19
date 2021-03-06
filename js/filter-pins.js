'use strict';
(function () {
  var DEFAULT_FILTER_STATE = 'any';
  var HIGH_HOUSE_PRICE = 50000;
  var LOW_HOUSE_PRICE = 10000;

  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = filterForm.querySelector('#housing-type');
  var housingPriceSelect = filterForm.querySelector('#housing-price');
  var housingRoomsSelect = filterForm.querySelector('#housing-rooms');
  var housingGuestsSelect = filterForm.querySelector('#housing-guests');
  var housingFeaturesContainer = filterForm.querySelector('#housing-features');

  var getPinsFilteredByHouseType = function (data) {
    var newData = data.filter(function (pin) {
      return pin.offer.type === housingTypeSelect.value;
    });

    return newData;
  };

  var getPinsFilteredByHousePrice = function (data) {
    var newData = data.filter(function (pin) {
      var price = pin.offer.price;

      switch (housingPriceSelect.value) {
        case 'high':
          return price > HIGH_HOUSE_PRICE;
        case 'low':
          return price < LOW_HOUSE_PRICE;
        default:
          return price >= LOW_HOUSE_PRICE && price <= HIGH_HOUSE_PRICE;
      }

    });

    return newData;
  };

  var getPinsFilteredByRoomsNumber = function (data) {
    var newData = data.filter(function (pin) {

      return pin.offer.rooms === parseInt(housingRoomsSelect.value, 10);
    });

    return newData;
  };

  var getPinsFilteredByGuestsNumber = function (data) {
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

  var getSelectedFeaturesList = function () {
    var selected = housingFeaturesContainer.querySelectorAll('input:checked');

    return Array.from(selected)
      .map(function (it) {
        return it.value;
      });
  };

  var getPinsFilteredByFeatures = function (data) {
    var selectedFeatures = getSelectedFeaturesList();
    var newData = data.filter(function (pin) {
      return selectedFeatures.every(function (it) {
        return pin.offer.features.includes(it);
      });
    });

    return newData;
  };

  window.filterPins = function (data) {
    var newPins = data.slice();
    var selectedFeatures = getSelectedFeaturesList();

    if (housingTypeSelect.value !== DEFAULT_FILTER_STATE) {
      newPins = getPinsFilteredByHouseType(newPins);
    }

    if (housingPriceSelect.value !== DEFAULT_FILTER_STATE) {
      newPins = getPinsFilteredByHousePrice(newPins);
    }

    if (housingRoomsSelect.value !== DEFAULT_FILTER_STATE) {
      newPins = getPinsFilteredByRoomsNumber(newPins);
    }

    if (housingGuestsSelect.value !== DEFAULT_FILTER_STATE) {
      newPins = getPinsFilteredByGuestsNumber(newPins);
    }

    if (selectedFeatures.length > 0) {
      newPins = getPinsFilteredByFeatures(newPins);
    }

    return newPins;
  };

  var onFilterFeaturesEnterPress = function (evt) {
    var target = evt.target;
    var event = new Event('change', {bubbles: true});

    if (evt.key === window.constants.enterKey) {
      window.util.changeCheckboxState(target);
      target.dispatchEvent(event);
    }

  };

  housingFeaturesContainer.addEventListener('keydown', onFilterFeaturesEnterPress);

})();
