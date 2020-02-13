'use strict';

(function () {
  // координаты адресов
  var ADDRESS_MIN_X = 100;
  var ADDRESS_MAX_X = 1000;
  var ADDRESS_MIN_Y = 50;
  var ADDRESS_MAX_Y = 500;
  // координаты меток на карте
  var PIN_MIN_X = 50;
  var PIN_MAX_X = 800;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;

  var ROOM_CAPACITY = 2;

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
    'conditioner'
  ];

  var descriptions = [
    'Описание 1',
    'Описание 2',
    'Описание 3',
    'Описание 4',
    'Описание 5',
    'Описание 6',
    'Описание 7',
    'Описание 8'
  ];

  var photoLinks = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel4.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel5.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel6.jpg'
  ];

  // получает фотографию аватара автора
  var getImageLink = function (index) {
    var imgNum = index + 1;
    return 'img/avatars/user0' + imgNum + '.png';
  };

  // получает заголовок предложения
  var getTitle = function (index) {
    return titles[index];
  };

  // получает цену аренды объекта
  var getPrice = function () {
    return window.util.getRandomInt(0, 2000);
  };

  // получает адрес объекта предложения
  var getAddress = function () {
    var coordX = window.util.getRandomInt(ADDRESS_MIN_X, ADDRESS_MAX_X);
    var coordY = window.util.getRandomInt(ADDRESS_MIN_Y, ADDRESS_MAX_Y);

    var address = coordX + ', ' + coordY;

    return address;
  };

  // получает время поступления
  var getCheckinTime = function () {
    return window.util.getRandomItemFromArray(checkinTimes);
  };

  // получает время убытия
  var getCheckoutTime = function () {
    return window.util.getRandomItemFromArray(checkoutTimes);
  };

  // получает тип объекта
  var getType = function () {
    return window.util.getRandomItemFromArray(flatTypes);
  };

  // получает список удобств
  var getFeatures = function () {
    var featuresString = '';

    return window.util.getRandomItemsFromArray(features, featuresString);
  };
  // получает количество комнат объекта
  var getRoomsNumber = function (type) {
    switch (type) {
      case 'bungalo':
        return window.util.getRandomInt(1, 3);
      case 'flat':
        return window.util.getRandomInt(1, 5);
      case 'house':
        return window.util.getRandomInt(4, 10);
      case 'palace':
        return window.util.getRandomInt(10, 20);
      default:
        return 3;
    }
  };

  // получает количество гостей
  var getGuestsNumber = function (rooms) {
    return ROOM_CAPACITY * rooms;
  };

  // получает описание объекта
  var getDescription = function () {
    var descriptionString = '';

    return window.util.getRandomItemsFromArray(descriptions, descriptionString);
  };

  // получает ссылки фотографий объекта
  var getPhotos = function () {
    var linksString = '';

    return window.util.getRandomItemsFromArray(photoLinks, linksString);
  };

  // получает координаты метки
  var getLocation = function () {
    var location = {};
    location.x = window.util.getRandomInt(PIN_MIN_X, PIN_MAX_X);
    location.y = window.util.getRandomInt(PIN_MIN_Y, PIN_MAX_Y);

    return location;
  };

  // создает объект автора
  var createAuthor = function (index) {
    var author = {};

    author.avatar = getImageLink(index);

    return author;
  };

  // создает объект предложения
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

  window.mock = {
    createObject: createObject
  };

})();
