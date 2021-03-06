'use strict';

(function () {
  var popupContainer = document.querySelector('main');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var closeModal = function () {
    var modal = popupContainer.querySelector('.modal');

    window.util.removeElement(modal, popupContainer);

    document.removeEventListener('keydown', onDocumentEscPressCloseModal);
    document.removeEventListener('click', onDocumentClickCloseModal);
  };

  var onDocumentClickCloseModal = function () {
    closeModal();
  };

  var onDocumentEscPressCloseModal = function (evt) {
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
      closeButton.addEventListener('click', onDocumentClickCloseModal);
    }

    fragment.appendChild(element);

    return fragment;
  };

  var renderSuccessPopup = function () {
    popupContainer.appendChild(setModal(successTemplate));
    document.addEventListener('keydown', onDocumentEscPressCloseModal);
    document.addEventListener('click', onDocumentClickCloseModal);
  };

  var renderErrorPopup = function () {
    popupContainer.appendChild(setModal(errorTemplate));
    document.addEventListener('keydown', onDocumentEscPressCloseModal);
    document.addEventListener('click', onDocumentClickCloseModal);
  };

  window.modal = {
    renderSuccessPopup: renderSuccessPopup,
    renderErrorPopup: renderErrorPopup,
  };

})();
