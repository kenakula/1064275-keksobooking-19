'use strict';
(function () {

  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = filterForm.querySelector('#housing-type');

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

  window.backend.load(successHandler, errorHandler);

  var houseTypeFilter = function (data) {
    var newData = data.filter(function (pin) {
      return pin.offer.type === housingTypeSelect.value;
    });

    return newData;
  };

  window.filter = {
    houseType: houseTypeFilter,
  };

})();
