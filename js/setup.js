'use strict';

(function () {
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

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
  var WIZARDS_COUNT = 4;
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var getRandomValue = function (arr) {
    var randomElement = Math.floor(Math.random() * arr.length);

    return arr[randomElement];
  };

  var searchTweens = function (subject, arr) {
    for (var i = 0; i < arr.length; i++) {
      var isNamesake = arr[i].name === subject;

      if (isNamesake) {
        return true;
      }
    }

    return false;
  };

  var generateInfo = function (count) {
    var info = [];

    do {
      var randomName = getRandomValue(NAMES);
      var randomSurname = getRandomValue(SURNAMES);
      var fullName = Math.random() > 0.5 ? randomName + ' ' + randomSurname : randomSurname + ' ' + randomName;

      var item = {
        name: fullName,
        coatColor: getRandomValue(COAT_COLORS),
        eyesColor: getRandomValue(EYES_COLORS)
      };

      var isNamesake = searchTweens(fullName, info);

      if (!isNamesake) {
        info.push(item);
      }

    } while (info.length !== count);

    return info;
  };

  var renderWizard = function (wizard, template) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

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

  var wizardsData = generateInfo(WIZARDS_COUNT);
  var wizardsList = popupSetup.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createFragment = function (data, template) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderWizard(data[i], template));
    }

    return fragment;
  };

  wizardsList.appendChild(createFragment(wizardsData, wizardTemplate));

  popupSetup.querySelector('.setup-similar').classList.remove('hidden');

  var setWizardCoatColor = function () {
    var randomCoatColor = getRandomValue(COAT_COLORS);

    setupWizardCoat.style.fill = randomCoatColor;
    coatColorField.value = randomCoatColor;
  };

  var setWizardEyesColor = function () {
    var randomEyesColor = getRandomValue(EYES_COLORS);

    setupWizardEyes.style.fill = randomEyesColor;
    eyesColorField.value = randomEyesColor;
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
    },
    onWizardNameChange: function () {
      var valueLength = setupNameField.value.length;

      setupNameField.setCustomValidity(getValidityMessage(valueLength));
      setupNameField.reportValidity();
    }
  };
})();
