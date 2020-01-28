/* eslint-disable no-console */
'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// получает фотографию аватара автора
var getImageLink = function () {
  return 'img/avatars/user0' + i + '.png';
};

// получает заголовок предложения
var getTitle = function () {
  var title = 'Заголовок предложения';

  return title;
};

// получает адрес объекта предложения
var getAddress = function () {
  var address = '{{location.x}}, {{location.y}}';

  return address;
};

// получает цену аренды объекта
var getPrice = function () {
  return Math.round(Math.random() * 2000) + ' Рублей за сутки';
};

// получает тип объекта
var getType = function () {
  var flatTypes = ['palace', 'flat', 'house', 'bungalo'];

  return flatTypes[Math.floor(Math.random() * flatTypes.length)];
};

// получает количество комнат объекта
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

// получает количество гостей
var getGuestsNumber = function (offer) {
  return 2 * offer.rooms;
};

// получает время поступления
var getCheckinTime = function () {
  var checkinTimes = ['12:00', '13:00', '14:00'];

  return checkinTimes[Math.floor(Math.random() * checkinTimes.length)];
};

// получает время убытия
var getCheckoutTime = function () {
  var checkoutTimes = ['12:00', '13:00', '14:00'];

  return checkoutTimes[Math.floor(Math.random() * checkoutTimes.length)];
};

// получает список удобств
var getFeatures = function () {
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var featuresString = '';

  for (var i = 0; i < features.length; i++) {
    if (i === features.length - 1) {
      featuresString += features[i];
    } else {
      featuresString += features[i] + ', ';
    }
  }

  return featuresString;
};

// получает описание объекта
var getDescription = function () {
  var description = 'Здесь описание объекта';

  return description;
};

// получает ссылки фотографий объекта
var getPhotos = function () {
  var photoLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  return photoLinks;
};

// получает координаты метки
var getLocation = function () {
  var location = {};
  location.x = Math.floor(Math.random() * (801 - 0));
  location.y = Math.floor(Math.random() * (631 - 130));

  return location;
};

// создает объект автора
var createAuthor = function () {
  var author = {};
  author.avatar = getImageLink();

  return author;
};

// создает объект предложениe
var createOffer = function () {
  var offer = {};

  offer.title = getTitle();
  offer.address = getAddress();
  offer.price = getPrice();
  offer.type = getType();
  offer.rooms = getRoomsNumber(offer);
  offer.guests = getGuestsNumber(offer);
  offer.checkin = getCheckinTime();
  offer.checkout = getCheckoutTime();
  offer.features = getFeatures();
  offer.description = getDescription();
  offer.photos = getPhotos();
  offer.location = getLocation();

  return offer;
};

// создает объект объявления
var createObject = function () {
  var object = {};

  object.author = createAuthor();
  object.offer = createOffer();

  return object;
};

// создает массив похожих объявлений

var nearbyOffers = [];

for (var i = 1; i < 9; i++) {
  nearbyOffers.push(createObject());
}

// находит шаблон пина и область куда будем вставлять их
var mapArea = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('.map__pin');

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
