'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapArea = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');

  var filterForm = document.querySelector('.map__filters');
  var filterFields = filterForm.querySelectorAll('fieldset, select');

  var adForm = document.querySelector('.ad-form');
  var formFields = adForm.querySelectorAll('fieldset');

  var titleInput = adForm.querySelector('#title');
  var addressInput = adForm.querySelector('#address');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var roomCapacitySelect = adForm.querySelector('#capacity');
  var houseTypeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var checkinTimeSelect = adForm.querySelector('#timein');
  var checkoutTimeSelect = adForm.querySelector('#timeout');
  var avatarFileChooser = adForm.querySelector('#avatar');
  var imagesFileChooser = adForm.querySelector('#images');

  var previewAvatar = adForm.querySelector('.ad-form-header__preview img');
  var photosContainer = adForm.querySelector('.ad-form__photo-container');
  var photoWrapper = photosContainer.querySelector('.ad-form__photo');
  var photoUploader = adForm.querySelector('.ad-form__upload');

  var defaultMainPinCoordinates = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  var resetMainPinPosition = function () {
    mainPin.style.left = defaultMainPinCoordinates.x + 'px';
    mainPin.style.top = defaultMainPinCoordinates.y + 'px';
    addressInput.value = Math.ceil(defaultMainPinCoordinates.x + window.constants.mainPinWidth / 2) + ', ' +
      Math.ceil(defaultMainPinCoordinates.y + window.constants.mainPinHeight / 2);
  };

  var inactivatePage = function () {
    window.card.closeCard();
    window.util.clearPins(mapArea);
    resetMainPinPosition();
    map.classList.add('map--faded');
  };

  var successHandler = function () {
    filterForm.reset();
    adForm.reset();
    window.util.changeFormFieldsState(filterFields, true);
    window.util.changeFormFieldsState(formFields, true);
    adForm.classList.add('ad-form--disabled');
    inactivatePage();
    window.modal.renderSuccessPopup();
  };

  var errorHandler = function () {
    window.modal.renderErrorPopup();
  };

  var setAvatar = function (evt) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      previewAvatar.src = reader.result;
    });
    reader.readAsDataURL(evt.target.files[0]);
  };

  var setPhoto = function (evt, elem) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      elem.src = reader.result;
      elem.setAttribute('width', '45');
      elem.setAttribute('height', '40');
      elem.setAttribute('alt', 'Фотография жилья');
    });
    reader.readAsDataURL(evt.target.files[0]);
  };

  var styleWrapper = function (elem) {
    elem.style.display = 'flex';
    elem.style.justifyContent = 'center';
    elem.style.alignItems = 'center';
  };

  var renderEstatePhoto = function (evt) {
    var elem = document.createElement('img');
    var wrapper = photoWrapper.cloneNode();
    styleWrapper(wrapper);
    photoWrapper.remove();
    setPhoto(evt, elem);
    wrapper.appendChild(elem);
    photoUploader.after(wrapper);
  };

  var synchronizeCheckout = function () {
    var checkinIndex = checkinTimeSelect.selectedIndex;
    checkoutTimeSelect.options[checkinIndex].selected = true;
  };

  var synchronizeCheckin = function () {
    var checkoutIndex = checkoutTimeSelect.selectedIndex;
    checkinTimeSelect.options[checkoutIndex].selected = true;
  };

  var setPricePlaceholder = function (type, input) {
    switch (type) {
      case 'bungalo':
        input.setAttribute('placeholder', window.constants.MinPrice.BUNGALO);
        break;
      case 'flat':
        input.setAttribute('placeholder', window.constants.MinPrice.FLAT);
        break;
      case 'house':
        input.setAttribute('placeholder', window.constants.MinPrice.HOUSE);
        break;
      default:
        input.setAttribute('placeholder', window.constants.MinPrice.PALACE);
    }
  };

  var onRoomCapacitySelectChange = function () {
    var message = window.validation.getRoomNumberSelectErrorMessage();
    roomCapacitySelect.setCustomValidity(message);
  };

  var onTitleInputChange = function () {
    var message = window.validation.getTitleInputErrorMessage();
    titleInput.setCustomValidity(message);
  };

  var onHouseTypeInputChange = function () {
    var houseType = houseTypeSelect.value;
    var message = window.validation.getHouseTypeErrorMessage();
    houseTypeSelect.setCustomValidity(message);
    setPricePlaceholder(houseType, priceInput);
  };

  var onPriceInputChange = function () {
    var message = window.validation.getPriceInputErrorMessage();
    priceInput.setCustomValidity(message);
  };

  var onImageChooserChange = function (evt) {
    window.validation.setPhotoErrorMessage(evt, imagesFileChooser);
    renderEstatePhoto(evt);
  };

  var onAvatarChooserChange = function (evt) {
    window.validation.setPhotoErrorMessage(evt, avatarFileChooser);
    setAvatar(evt);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(adForm), successHandler, errorHandler);
  };

  roomCapacitySelect.addEventListener('change', onRoomCapacitySelectChange);
  roomNumberSelect.addEventListener('change', onRoomCapacitySelectChange);
  titleInput.addEventListener('change', onTitleInputChange);
  houseTypeSelect.addEventListener('change', onHouseTypeInputChange);
  priceInput.addEventListener('change', onHouseTypeInputChange);
  priceInput.addEventListener('change', onPriceInputChange);
  checkinTimeSelect.addEventListener('change', synchronizeCheckout);
  checkoutTimeSelect.addEventListener('change', synchronizeCheckin);

  avatarFileChooser.addEventListener('change', onAvatarChooserChange);
  imagesFileChooser.addEventListener('change', onImageChooserChange);

  adForm.addEventListener('submit', onFormSubmit);

})();


