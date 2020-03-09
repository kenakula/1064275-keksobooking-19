'use strict';

(function () {
  var popupContainer = document.querySelector('main');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var closeModal = function () {
    var modal = popupContainer.querySelector('.modal');

    if (modal) {
      popupContainer.removeChild(modal);
    }

    document.removeEventListener('keydown', onModalEscPress);
  };

  var onModalEscPress = function (evt) {
    if (evt.key === window.constants.escKey) {
      closeModal();
    }
  };

  var setModal = function (template) {
    var fragment = document.createDocumentFragment();
    var element = template.cloneNode(true);
    element.classList.add('modal');

    var closeButton = element.querySelector('.error__button');
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }

    fragment.appendChild(element);

    return fragment;
  };

  var renderSuccessPopup = function () {
    popupContainer.appendChild(setModal(successTemplate));
    document.addEventListener('keydown', onModalEscPress);
  };

  var renderErrorPopup = function () {
    popupContainer.appendChild(setModal(errorTemplate));
    document.addEventListener('keydown', onModalEscPress);
  };

  window.modal = {
    renderSuccessPopup: renderSuccessPopup,
    renderErrorPopup: renderErrorPopup,
  };

})();
