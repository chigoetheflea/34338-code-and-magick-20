'use strict';

(function () {
  var setupOpenButton = document.querySelector('.setup-open');

  var popupSetup = document.querySelector('.setup');
  var setupForm = popupSetup.querySelector('.setup-wizard-form');
  var setupCloseButton = popupSetup.querySelector('.setup-close');
  var setupNameField = popupSetup.querySelector('.setup-user-name');
  var setupPlayer = popupSetup.querySelector('.setup-player');
  var setupDefaultTop = 0;
  var setupDefaultLeft = 0;

  var onPopupEscPress = function (evt) {
    window.utility.isEscEvent(evt, window.closePopup);
  };

  var onSetupOpenClick = function () {
    openPopup();
  };

  setupOpenButton.addEventListener('click', onSetupOpenClick);

  var onSetupOpenPress = function (evt) {
    window.utility.isEnterEvent(evt, openPopup);
  };

  setupOpenButton.addEventListener('keydown', onSetupOpenPress);

  var onSetupCloseClick = function () {
    window.closePopup();
  };

  var onSetupClosePress = function (evt) {
    window.utility.isEnterEvent(evt, window.closePopup);
  };

  var openPopup = function () {
    popupSetup.classList.remove('hidden');

    setupDefaultTop = popupSetup.offsetTop;
    setupDefaultLeft = popupSetup.offsetLeft;

    document.addEventListener('keydown', onPopupEscPress);
    setupNameField.addEventListener('input', window.setup.onWizardNameChange);
    setupPlayer.addEventListener('click', window.setup.onPlayerPress);
    setupCloseButton.addEventListener('click', onSetupCloseClick);
    setupCloseButton.addEventListener('keydown', onSetupClosePress);
    setupForm.addEventListener('submit', window.setup.onSetupSubmit);
  };

  window.closePopup = function () {
    popupSetup.classList.add('hidden');

    popupSetup.style.top = setupDefaultTop + 'px';
    popupSetup.style.left = setupDefaultLeft + 'px';

    document.removeEventListener('keydown', onPopupEscPress);
    setupNameField.removeEventListener('input', window.setup.onWizardNameChange);
    setupPlayer.removeEventListener('click', window.setup.onPlayerPress);
    setupCloseButton.removeEventListener('keydown', onSetupClosePress);
    setupCloseButton.removeEventListener('click', onSetupCloseClick);
    setupForm.removeEventListener('submit', window.setup.onSetupSubmit);
  };
})();
