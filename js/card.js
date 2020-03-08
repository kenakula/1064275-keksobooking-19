'use strict';
(function () {
  var PRICE_CURRENCY_STRING = '&#x20bd;<span>/ночь</span>';
  var ESC_KEY = 'Escape';

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var map = document.querySelector('.map');
  var mapArea = map.querySelector('.map__pins');

  var flatTypeMap = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец',
  };

  var featuresMap = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner',
  };

  var getFlatType = function (data) {
    var flatType = data.offer.type;

    return flatTypeMap[flatType];
  };

  var getRoomsGuestsNumber = function (data) {
    var rooms = data.offer.rooms;
    var guests = data.offer.guests;

    return rooms + ' комнаты для ' + guests + ' гостей.';
  };

  var getTime = function (data) {
    var checkInTime = data.offer.checkin;
    var checkOutTime = data.offer.checkout;

    return 'Заезд после ' + checkInTime + ', выезд до ' + checkOutTime;
  };

  var renderPhotos = function (elem, data) {
    var fragment = document.createDocumentFragment();
    var offerPhotos = data.offer.photos;

    hideIfEmpty(elem, offerPhotos);
    clearContainer(elem);

    offerPhotos.forEach(function (it) {
      var photo = cardTemplate.querySelector('.popup__photo').cloneNode();
      photo.src = it;
      fragment.appendChild(photo);
    });

    elem.appendChild(fragment);
  };

  var renderFeatures = function (elem, data) {
    var fragment = document.createDocumentFragment();
    var offerFeatures = data.offer.features;

    hideIfEmpty(elem, offerFeatures);
    clearContainer(elem);

    offerFeatures.forEach(function (it) {
      var feature = cardTemplate.querySelector('.popup__feature').cloneNode();
      var featureClassName = featuresMap[it];
      feature.classList.add(featureClassName);
      fragment.appendChild(feature);
    });

    elem.appendChild(fragment);
  };

  var clearContainer = function (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  var hideIfEmpty = function (elem, data) {
    if (data.length === 0) {
      elem.style.display = 'none';
    }
  };

  var setCard = function (data) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardFeaturesContainer = cardElement.querySelector('.popup__features');
    var photoContainer = cardElement.querySelector('.popup__photos');
    var closeButton = cardElement.querySelector('.popup__close');

    closeButton.addEventListener('click', closeCard);

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__type').textContent = getFlatType(data);
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = data.offer.price + PRICE_CURRENCY_STRING;
    cardElement.querySelector('.popup__text--capacity').textContent = getRoomsGuestsNumber(data);
    cardElement.querySelector('.popup__text--time').textContent = getTime(data);
    cardElement.querySelector('.popup__description').textContent = data.offer.description;

    renderPhotos(photoContainer, data);
    renderFeatures(cardFeaturesContainer, data);

    return cardElement;
  };

  var makePinActive = function (evt) {
    var activePin = mapArea.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    evt.currentTarget.classList.add('map__pin--active');
  };

  var renderCard = function (evt) {
    var dataIndex = evt.currentTarget.getAttribute('data-index');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(setCard(window.dataPins[dataIndex]));
    mapArea.after(fragment);
    document.addEventListener('keydown', onEscPress);
  };

  var closeCard = function () {
    var card = map.querySelector('.popup');

    if (card) {
      map.removeChild(card);
    }

    document.removeEventListener('keydown', onEscPress);
  };

  var onOfferPinClick = function (evt) {
    makePinActive(evt);
    closeCard();
    renderCard(evt);
  };

  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeCard();
    }
  };

  window.card = {
    closeCard: closeCard,
    onOfferPinClick: onOfferPinClick,
  };

})();
