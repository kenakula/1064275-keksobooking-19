'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

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

  var onMainPinClick = function () {
    activatePage();
  };

  var onMainPinPress = function (evt) {
    if (evt.key === KEY_ENTER) {
      activatePage();
    }
  };

  var renderPin = function (dataPin) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');

    pinElement.style.left = dataPin.location.x - (PIN_WIDTH / 2) + 'px';
    pinElement.style.top = dataPin.location.y - PIN_HEIGHT + 'px';
    img.src = dataPin.author.avatar;
    img.alt = dataPin.offer.title;

    return pinElement;
  };

  var successHandler = function (dataPins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < dataPins.length; i++) {
      var getRandomPin = dataPins[i];

      fragment.appendChild(renderPin(getRandomPin));
    }

    mapArea.appendChild(fragment);
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

  // активирует страницу
  var activatePage = function () {
    map.classList.remove('map--faded');
    window.backend.load(successHandler, errorHandler);
    adForm.classList.remove('ad-form--disabled');
    changeFormFieldsState(formFields, false);
  };

  addressInput.value = getCoordinates(mainPin);

  changeFormFieldsState(formFields, true);

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinPress);

})();
