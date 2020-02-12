'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var OFFER_COUNT = 8;

  var adForm = document.querySelector('.ad-form');
  var formFields = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');
  var map = document.querySelector('.map');
  var mapArea = map.querySelector('.map__pins');
  var mainPin = mapArea.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // деактивирует поле ввода
  var changeFormFieldsState = function (data, boolean) {
    for (var i = 0; i < data.length; i++) {
      data[i].disabled = boolean;
    }
  };

  var getCoordinates = function (pin) {
    var posX = pin.offsetLeft - (PIN_WIDTH / 2);
    var posY = pin.offsetTop - PIN_HEIGHT;

    return posX + ', ' + posY;
  };

  // поолучает массив похожих объявлений
  var getMocks = function (count) {
    var result = [];

    for (var i = 0; i < count; i++) {
      result.push(window.mock.createObject(i));
    }

    return result;
  };

  // позиционирует и стилизует пин
  var setPin = function (data, element) {
    var img = element.querySelector('img');

    element.style.left = data.offer.location.x - (PIN_WIDTH / 2) + 'px';
    element.style.top = data.offer.location.y - PIN_HEIGHT + 'px';
    img.src = data.author.avatar;
    img.alt = data.offer.title;
  };

  // создает фрагмент пинов
  var getFragment = function (data, template) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var pinElement = template.cloneNode(true);
      setPin(data[i], pinElement);
      fragment.appendChild(pinElement);
    }

    return fragment;
  };


  // активирует страницу
  var activatePage = function () {
    map.classList.remove('map--faded');
    mapArea.appendChild(pinsFragment);
    adForm.classList.remove('ad-form--disabled');
    changeFormFieldsState(formFields, false);
  };

  var onMainPinClick = function () {
    activatePage();
  };

  var onMainPinPress = function (evt) {
    if (evt.key === KEY_ENTER) {
      activatePage();
    }
  };

  var data = getMocks(OFFER_COUNT);
  var pinsFragment = getFragment(data, pinTemplate);
  addressInput.value = getCoordinates(mainPin);

  changeFormFieldsState(formFields, true);

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinPress);

})();
