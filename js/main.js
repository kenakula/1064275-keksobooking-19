/* eslint-disable no-console */
'use strict';
// координаты адресов
var ADDRESS_MIN_X = 100;
var ADDRESS_MAX_X = 1000;
var ADDRESS_MIN_Y = 50;
var ADDRESS_MAX_Y = 500;
// координаты меток на карте
var PIN_MIN_X = 0;
var PIN_MAX_X = 800;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
// другое
var ROOM_CAPACITY = 2;
var OFFER_COUNT = 8;

var titles = [
  'Заголовок предложения 1',
  'Заголовок предложения 2',
  'Заголовок предложения 3',
  'Заголовок предложения 4',
  'Заголовок предложения 5',
  'Заголовок предложения 6',
  'Заголовок предложения 7',
  'Заголовок предложения 8'
];

var flatTypes = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkinTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var checkoutTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var descriptions = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5',
  'Описание 6',
  'Описание 7',
  'Описание 8',
];

var photoLinks = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel4.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel5.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel6.jpg',
];

// получает случайное число в заданном диапазоне +
var getRandomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

// получает случайную строку из массива +
var getRandomItemsFromArray = function (array, string) {
  var ITEMS_COUNT = getRandomInt(0, array.length);

  for (var i = 0; i < ITEMS_COUNT; i++) {
    var item = i === 0 ? array[i] : ', ' + array[i];
    string += item;
  }

  return string;
};

// получает максимальный индекс массива +
var getMaxIndex = function (array) {
  return array.length - 1;
};

// получает фотографию аватара автора +
var getImageLink = function (index) {
  var imgNum = index + 1;
  return 'img/avatars/user0' + imgNum + '.png';
};

// получает заголовок предложения +
var getTitle = function (index) {
  return titles[index];
};

// получает адрес объекта предложения +
var getAddress = function () {
  var coordX = getRandomInt(ADDRESS_MIN_X, ADDRESS_MAX_X);
  var coordY = getRandomInt(ADDRESS_MIN_Y, ADDRESS_MAX_Y);

  var address = coordX + ', ' + coordY;

  return address;
};

// получает цену аренды объекта +
var getPrice = function () {
  return getRandomInt(0, 2000);
};

// получает тип объекта +
var getType = function () {
  return flatTypes[getRandomInt(0, getMaxIndex(flatTypes))];
};

// получает количество комнат объекта +
var getRoomsNumber = function (type) {
  switch (type) {
    case 'bungalo':
      return getRandomInt(1, 3);
    case 'flat':
      return getRandomInt(1, 5);
    case 'house':
      return getRandomInt(4, 10);
    case 'palace':
      return getRandomInt(10, 20);
    default:
      return 3;
  }
};

// получает количество гостей +
var getGuestsNumber = function (rooms) {
  return ROOM_CAPACITY * rooms;
};

// получает время поступления +
var getCheckinTime = function () {
  return checkinTimes[getRandomInt(0, getMaxIndex(checkinTimes))];
};

// получает время убытия +
var getCheckoutTime = function () {
  return checkoutTimes[getRandomInt(0, getMaxIndex(checkoutTimes))];
};

// получает список удобств +
var getFeatures = function () {
  var featuresString = '';

  return getRandomItemsFromArray(features, featuresString);
};

// получает описание объекта +
var getDescription = function () {
  var descriptionString = '';

  return getRandomItemsFromArray(descriptions, descriptionString);
};

// получает ссылки фотографий объекта +
var getPhotos = function () {
  var linksString = '';

  return getRandomItemsFromArray(photoLinks, linksString);
};

// получает координаты метки +
var getLocation = function () {
  var location = {};
  location.x = getRandomInt(PIN_MIN_X, PIN_MAX_X);
  location.y = getRandomInt(PIN_MIN_Y, PIN_MAX_Y);

  return location;
};

// создает объект автора
var createAuthor = function (index) {
  var author = {};

  author.avatar = getImageLink(index);

  return author;
};

// создает объект предложениe
var createOffer = function (index) {
  var offer = {};

  offer.title = getTitle(index);
  offer.address = getAddress();
  offer.price = getPrice();
  offer.type = getType();
  offer.rooms = getRoomsNumber(offer.type);
  offer.guests = getGuestsNumber(offer.rooms);
  offer.checkin = getCheckinTime();
  offer.checkout = getCheckoutTime();
  offer.features = getFeatures();
  offer.description = getDescription();
  offer.photos = getPhotos();
  offer.location = getLocation();

  return offer;
};

// создает объект объявления
var createObject = function (index) {
  var object = {};

  object.author = createAuthor(index);
  object.offer = createOffer(index);

  return object;
};

// создает массив похожих объявлений
var nearbyOffers = [];

var getMocks = function (count, array) {

  for (var i = 0; i < count; i++) {
    array.push(createObject(i));
  }

  return array;
};

getMocks(OFFER_COUNT, nearbyOffers);


// находит шаблон пина и область куда будем вставлять их
var mapArea = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('.map__pin');
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// перебирает массив объектов и подставляет данные
for (var j = 0; j < 8; j++) {
  var pinElement = pinTemplate.cloneNode(true);
  var coordLeft = nearbyOffers[j].offer.location.x + 'px; ';
  var coordTop = nearbyOffers[j].offer.location.y + 'px; ';

  pinElement.style.cssText = 'left: ' + coordLeft + 'top: ' + coordTop;

  pinElement.querySelector('img').setAttribute('src', nearbyOffers[j].author.avatar);
  pinElement.querySelector('img').setAttribute('alt', nearbyOffers[j].offer.title);

  mapArea.appendChild(pinElement);
}

console.log(nearbyOffers);
