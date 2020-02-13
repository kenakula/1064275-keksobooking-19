'use strict';

(function () {

  var getRandomInt = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  };

  var getMaxIndex = function (array) {
    return array.length - 1;
  };

  var getRandomItemFromArray = function (data) {
    return data[getRandomInt(0, getMaxIndex(data))];
  };

  var getRandomItemsFromArray = function (array, string) {
    var ITEMS_COUNT = getRandomInt(0, array.length);

    for (var i = 0; i < ITEMS_COUNT; i++) {
      var item = i === 0 ? array[i] : ', ' + array[i];
      string += item;
    }

    return string;
  };

  window.util = {
    getRandomInt: getRandomInt,
    getMaxIndex: getMaxIndex,
    getRandomItemFromArray: getRandomItemFromArray,
    getRandomItemsFromArray: getRandomItemsFromArray,
  };

})();
