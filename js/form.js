'use strict';

(function () {
  var errorInputShadowStyle = '0 0 2px 2px red';
  var defaultAvatarImagePath = 'img/muffin-grey.svg';

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
  var featuresContainer = adForm.querySelector('.features');
  var avatarFileChooser = adForm.querySelector('#avatar');
  var imagesFileChooser = adForm.querySelector('#images');

  var previewAvatar = adForm.querySelector('.ad-form-header__preview img');
  var photosContainer = adForm.querySelector('.ad-form__photo-container');
  var photoWrapper = photosContainer.querySelector('.ad-form__photo');
  var photoUploader = adForm.querySelector('.ad-form__upload');
  var resetButton = adForm.querySelector('.ad-form__reset');

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

  var resetForms = function () {
    resetAvatar();
    resetEstatePhotos();
    filterForm.reset();
    adForm.reset();
    window.util.changeFormFieldsState(filterFields, true);
    window.util.changeFormFieldsState(formFields, true);
    adForm.classList.add('ad-form--disabled');
  };

  var onLoadSuccess = function () {
    resetForms();
    inactivatePage();
    window.modal.renderSuccessPopup();
  };

  var onLoadError = function () {
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
    elem.classList.add('user-uploaded-photo');
    elem.style.display = 'flex';
    elem.style.justifyContent = 'center';
    elem.style.alignItems = 'center';
  };

  var renderEstatePhoto = function (evt) {
    photoWrapper.style.display = 'none';
    var wrapper = photoWrapper.cloneNode();
    styleWrapper(wrapper);

    var photo = document.createElement('img');
    setPhoto(evt, photo);

    wrapper.appendChild(photo);
    photoUploader.after(wrapper);
  };

  var onCheckinSelectCheckoutTimeSynchronize = function () {
    var checkinIndex = checkinTimeSelect.selectedIndex;
    checkoutTimeSelect.options[checkinIndex].selected = true;
  };

  var onCheckoutSelectCheckinTimeSynchronize = function () {
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

  var changeInputOutline = function (message, input) {
    if (message.length > 0) {
      input.classList.add('errored');
      input.style.boxShadow = errorInputShadowStyle;
    } else {
      input.style.boxShadow = '';
    }
  };

  var resetOutlines = function () {
    var inputs = adForm.querySelectorAll('.errored');
    inputs.forEach(function (it) {
      it.classList.remove('errored');
      it.style.boxShadow = '';
    });
  };

  var resetAvatar = function () {
    previewAvatar.src = defaultAvatarImagePath;
  };

  var resetEstatePhotos = function () {
    var emptyWrapper = photosContainer.querySelector('.ad-form__photo:not(.user-uploaded-photo)');
    emptyWrapper.style.display = '';

    var photos = photosContainer.querySelectorAll('.user-uploaded-photo');
    photos.forEach(function (it) {
      it.remove();
    });

  };

  var onRoomCapacitySelectChange = function () {
    var message = window.validation.getRoomNumberSelectErrorMessage();
    roomCapacitySelect.setCustomValidity(message);
    changeInputOutline(message, roomCapacitySelect);
  };

  var onTitleInputChange = function () {
    var message = window.validation.getTitleInputErrorMessage();
    titleInput.setCustomValidity(message);
    changeInputOutline(message, titleInput);
  };

  var onHouseTypeInputChange = function () {
    var houseType = houseTypeSelect.value;
    var message = window.validation.getHouseTypeErrorMessage();
    houseTypeSelect.setCustomValidity(message);
    changeInputOutline(message, priceInput);
    setPricePlaceholder(houseType, priceInput);
  };

  var onPriceInputChange = function () {
    var message = window.validation.getPriceInputErrorMessage();
    priceInput.setCustomValidity(message);
    changeInputOutline(message, priceInput);
  };

  var onFormFeaturesEnterPress = function (evt) {
    var target = evt.target;

    if (evt.key === window.constants.enterKey) {
      evt.preventDefault();
      window.util.changeCheckboxState(target);
    }

  };

  var onPhotoChooserChange = function (evt) {
    window.validation.setPhotoErrorMessage(evt, imagesFileChooser);
    renderEstatePhoto(evt);
  };

  var onAvatarChooserChange = function (evt) {
    window.validation.setPhotoErrorMessage(evt, avatarFileChooser);
    setAvatar(evt);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(adForm), onLoadSuccess, onLoadError);
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    resetAvatar();
    resetEstatePhotos();
    resetOutlines();
    resetForms();
    inactivatePage();
  };

  roomCapacitySelect.addEventListener('change', onRoomCapacitySelectChange);
  roomNumberSelect.addEventListener('change', onRoomCapacitySelectChange);
  titleInput.addEventListener('change', onTitleInputChange);
  houseTypeSelect.addEventListener('change', onHouseTypeInputChange);
  priceInput.addEventListener('change', onHouseTypeInputChange);
  priceInput.addEventListener('change', onPriceInputChange);
  checkinTimeSelect.addEventListener('change', onCheckinSelectCheckoutTimeSynchronize);
  checkoutTimeSelect.addEventListener('change', onCheckoutSelectCheckinTimeSynchronize);
  featuresContainer.addEventListener('keydown', onFormFeaturesEnterPress);

  avatarFileChooser.addEventListener('change', onAvatarChooserChange);
  imagesFileChooser.addEventListener('change', onPhotoChooserChange);

  adForm.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);

})();


