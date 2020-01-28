/* eslint-disable no-console */
'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getImageLink = function () {
  return 'img/avatars/user0' + i + '.png';
};

var getPrice = function () {
  return Math.round(Math.random() * 2000) + ' Рублей за сутки';
};

var getType = function () {
  var flatTypes = ['palace', 'flat', 'house', 'bungalo'];

  return flatTypes[Math.floor(Math.random() * 4)];
};

var getRoomsNumber = function (offer) {
  var index;

  if (offer.type === 'palace') {
    index = 20;
  } else if (offer.type === 'flat') {
    index = 5;
  } else if (offer.type === 'house') {
    index = 10;
  } else if (offer.type === 'bungalo') {
    index = 3;
  }

  return Math.ceil(Math.random() * index);
};

// что-то не так с логикой

var getGuestsNumber = function (offer) {
  return 2 * offer.rooms;
};

var createOffer = function () {
  var offer = {};

  offer.title = 'Заголовок предложения';
  offer.address = '{{location.x}}, {{location.y}}';
  offer.price = getPrice();
  offer.type = getType();
  offer.rooms = getRoomsNumber(offer);
  offer.guests = getGuestsNumber(offer);

  return offer;
};

var createObject = function () {
  var object = {};
  object.author = {avatar: getImageLink()};
  object.offer = createOffer();

  return object;
};

for (var i = 1; i < 9; i++) {
  console.log(createObject());
}


