'use strict';

(function () {
  var setupOpenButton = document.querySelector('.setup-open');

  var popupSetup = document.querySelector('.setup');
  var setupCloseButton = popupSetup.querySelector('.setup-close');
  var setupNameField = popupSetup.querySelector('.setup-user-name');
  var setupPlayer = popupSetup.querySelector('.setup-player');
  var setupDefaultTop = 0;
  var setupDefaultLeft = 0;

  var openPopup = function () {
    popupSetup.classList.remove('hidden');

    setupDefaultTop = popupSetup.offsetTop;
    setupDefaultLeft = popupSetup.offsetLeft;

    document.addEventListener('keydown', onPopupEscPress);
    setupNameField.addEventListener('input', window.setup.onWizardNameChange);
    setupPlayer.addEventListener('click', window.setup.onPlayerPress);
    setupCloseButton.addEventListener('click', onSetupCloseClick);
    setupCloseButton.addEventListener('keydown', onSetupClosePress);
  };

  var closePopup = function () {
    popupSetup.classList.add('hidden');

    window.dialog.resetSetupPosition({
      left: setupDefaultLeft,
      top: setupDefaultTop
    });

    document.removeEventListener('keydown', onPopupEscPress);
    setupNameField.removeEventListener('input', window.setup.onWizardNameChange);
    setupPlayer.removeEventListener('click', window.setup.onPlayerPress);
    setupCloseButton.removeEventListener('keydown', onSetupClosePress);
    setupCloseButton.removeEventListener('click', onSetupCloseClick);
  };

  var onPopupEscPress = function (evt) {
    window.utility.isEscEvent(evt, closePopup);
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
    closePopup();
  };

  var onSetupClosePress = function (evt) {
    window.utility.isEnterEvent(evt, closePopup);
  };
})();
