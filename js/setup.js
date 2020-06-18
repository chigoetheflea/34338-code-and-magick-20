'use strict';

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
    if (arr[i].name === subject) {
      return false;
    }
  }

  return true;
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

    if (searchTweens(fullName, info)) {
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

var setupOpenButton = document.querySelector('.setup-open');

var popupSetup = document.querySelector('.setup');
var setupCloseButton = popupSetup.querySelector('.setup-close');
var setupNameField = popupSetup.querySelector('.setup-user-name');
var setupPlayer = popupSetup.querySelector('.setup-player');
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

var onPlayerPress = function (evt) {
  var target = evt.target;
  var fireBallWrapSelector = '.setup-fireball-wrap';

  if (target === setupWizardCoat) {
    setWizardCoatColor();
  }

  if (target === setupWizardEyes) {
    setWizardEyesColor();
  }

  if (target.closest(fireBallWrapSelector)) {
    setWizardFireBallColor();
  }
};

var getValidityMessage = function (valueLength) {
  if (valueLength === 0) {
    return 'Введите имя вашего мага (минимум ' + MIN_NAME_LENGTH + ' симв.)';
  }

  if (valueLength < MIN_NAME_LENGTH) {
    return 'Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.';
  }

  if (valueLength > MAX_NAME_LENGTH) {
    return 'Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.';
  }

  return '';
};

var onWizardNameChange = function () {
  var valueLength = setupNameField.value.length;

  setupNameField.setCustomValidity(getValidityMessage(valueLength));
  setupNameField.reportValidity();
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== setupNameField) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  popupSetup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  setupNameField.addEventListener('input', onWizardNameChange);
  setupPlayer.addEventListener('click', onPlayerPress);
};

var closePopup = function () {
  popupSetup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  setupNameField.removeEventListener('input', onWizardNameChange);
  setupPlayer.removeEventListener('click', onPlayerPress);
};

setupOpenButton.addEventListener('click', function () {
  openPopup();
});

setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    openPopup();
  }
});

setupCloseButton.addEventListener('click', function () {
  closePopup();
});

setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});
