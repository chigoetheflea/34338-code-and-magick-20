'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;
  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var SUCCESS_SAVE_TIMEOUT = 2000;

  var getRandomValue = function (arr) {
    var randomElement = Math.floor(Math.random() * arr.length);

    return arr[randomElement];
  };

  var renderWizard = function (wizard, template) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var popupSetup = document.querySelector('.setup');
  var setupNameField = popupSetup.querySelector('.setup-user-name');
  var setupWizardCoat = popupSetup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = popupSetup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = popupSetup.querySelector('.setup-fireball-wrap');

  var setupForm = document.querySelector('.setup-wizard-form');
  var coatColorField = setupForm.querySelector('[name=coat-color]');
  var eyesColorField = setupForm.querySelector('[name=eyes-color]');
  var fireBallColorField = setupForm.querySelector('[name=fireball-color]');

  var similarWizardsData = null;
  var wizardCoatColor = null;
  var wizardEyesColor = null;

  var wizardsList = popupSetup.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var errorMessage = popupSetup.querySelector('.response');

  var createWizardsFragment = function (data, template) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderWizard(data[i], template));
    }

    return fragment;
  };

  var renderSimilarWizards = function (data) {
    hideResponseResult();

    wizardsList.innerHTML = '';
    wizardsList.appendChild(createWizardsFragment(data, wizardTemplate));

    popupSetup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var hideResponseResult = function () {
    errorMessage.classList.add('hidden');

    errorMessage.textContent = '';
  };

  var showResponseResult = function (message, isSave) {
    errorMessage.textContent = message;

    errorMessage.classList.remove('hidden');

    if (isSave) {
      setTimeout(function () {
        hideResponseResult();

        window.closePopup();
      }, SUCCESS_SAVE_TIMEOUT);
    }
  };

  var saveDataFromServer = function (data) {
    similarWizardsData = data;

    updateSimilarWizards();
  };

  window.backend.load(saveDataFromServer, showResponseResult);

  var getWizardRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardCoatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === wizardEyesColor) {
      rank += 1;
    }

    return rank;
  };

  var compareNames = function (left, right) {
    if (left > right) {
      return 1;
    }

    if (left < right) {
      return -1;
    }

    return 0;
  };

  var sortWizards = function (left, right) {
    var difference = getWizardRank(right) - getWizardRank(left);

    if (difference === 0) {
      difference = compareNames(left.name, right.name);
    }

    return difference;
  };

  var updateSimilarWizards = function () {
    var sortedWizards = similarWizardsData.slice().sort(sortWizards);

    renderSimilarWizards(sortedWizards.slice(0, MAX_SIMILAR_WIZARD_COUNT));
  };

  var setWizardCoatColor = function () {
    wizardCoatColor = getRandomValue(COAT_COLORS);

    setupWizardCoat.style.fill = wizardCoatColor;
    coatColorField.value = wizardCoatColor;
  };

  var setWizardEyesColor = function () {
    wizardEyesColor = getRandomValue(EYES_COLORS);

    setupWizardEyes.style.fill = wizardEyesColor;
    eyesColorField.value = wizardEyesColor;
  };

  var setWizardFireBallColor = function () {
    var randomFireballColor = getRandomValue(FIREBALL_COLORS);

    setupWizardFireball.style.background = randomFireballColor;
    fireBallColorField.value = randomFireballColor;
  };

  var getValidityMessage = function (valueLength) {
    var isTooShort = valueLength === 0;
    var isNotEnough = valueLength < MIN_NAME_LENGTH;
    var isTooLong = valueLength > MAX_NAME_LENGTH;

    if (isTooShort) {
      return 'Введите имя вашего мага (минимум ' + MIN_NAME_LENGTH + ' симв.)';
    }

    if (isNotEnough) {
      return 'Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.';
    }

    if (isTooLong) {
      return 'Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.';
    }

    return '';
  };

  setWizardCoatColor();
  setWizardEyesColor();

  window.setup = {
    onPlayerPress: function (evt) {
      var target = evt.target;
      var fireBallWrapSelector = '.setup-fireball-wrap';
      var isCoat = target === setupWizardCoat;
      var isEyes = target === setupWizardEyes;
      var isFireball = target.closest(fireBallWrapSelector);

      if (isCoat) {
        setWizardCoatColor();
      }

      if (isEyes) {
        setWizardEyesColor();
      }

      if (isFireball) {
        setWizardFireBallColor();
      }

      window.debounce(updateSimilarWizards);
    },
    onWizardNameChange: function () {
      var valueLength = setupNameField.value.length;

      setupNameField.setCustomValidity(getValidityMessage(valueLength));
      setupNameField.reportValidity();
    },
    onSetupSubmit: function (evt) {
      evt.preventDefault();

      window.backend.save(new FormData(setupForm), showResponseResult, showResponseResult);
    }
  };
})();
