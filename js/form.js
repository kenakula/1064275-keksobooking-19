'use strict';

(function () {
  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var roomCapacitySelect = adForm.querySelector('#capacity');
  var titleInput = adForm.querySelector('#title');
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

  var fileMatches = function (elem) {
    var file = elem.files[0];
    var fileName = file.name.toLowerCase();

    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
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

  var validateImagesChooser = function (evt) {
    var matches = fileMatches(evt.target);
    var message = '';

    if (matches) {
      renderEstatePhoto(evt);
    } else {
      message = 'Для фотографии подойдет только изображение';
    }

    imagesFileChooser.setCustomValidity(message);
  };

  var valiateAvatarChooser = function (evt) {
    var matches = fileMatches(evt.target);
    var message = '';

    if (matches) {
      setAvatar(evt);
    } else {
      message = 'Для аватара подойдет только изображение';
    }

    avatarFileChooser.setCustomValidity(message);
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
        input.setAttribute('placeholder', MIN_BUNGALO_PRICE);
        break;
      case 'flat':
        input.setAttribute('placeholder', MIN_FLAT_PRICE);
        break;
      case 'house':
        input.setAttribute('placeholder', MIN_HOUSE_PRICE);
        break;
      default:
        input.setAttribute('placeholder', MIN_PALACE_PRICE);
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

  roomCapacitySelect.addEventListener('change', onRoomCapacitySelectChange);
  roomNumberSelect.addEventListener('change', onRoomCapacitySelectChange);

  titleInput.addEventListener('change', onTitleInputChange);

  houseTypeSelect.addEventListener('change', onHouseTypeInputChange);
  priceInput.addEventListener('change', onHouseTypeInputChange);
  priceInput.addEventListener('change', onPriceInputChange);
  checkinTimeSelect.addEventListener('change', synchronizeCheckout);
  checkoutTimeSelect.addEventListener('change', synchronizeCheckin);

  avatarFileChooser.addEventListener('change', valiateAvatarChooser);
  imagesFileChooser.addEventListener('change', validateImagesChooser);
})();


