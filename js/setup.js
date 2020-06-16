'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
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

var popupWindow = document.querySelector('.setup');

var wizardsData = generateInfo(WIZARDS_COUNT);
var wizardsList = popupWindow.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var createFragment = function (data, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderWizard(data[i], template));
  }

  return fragment;
};

wizardsList.appendChild(createFragment(wizardsData, wizardTemplate));

popupWindow.querySelector('.setup-similar').classList.remove('hidden');

var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = document.querySelector('.setup-close');
var setupNameField = document.querySelector('.setup-user-name');
var setupForm = document.querySelector('.setup-wizard-form');
var setupPlayer = document.querySelector('.setup-player');
var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');

var setWizardCoatColor = function () {
  var randomCoatColor = getRandomValue(COAT_COLORS);
  var coatColorField = setupForm.querySelector('[name=coat-color]');

  setupWizardCoat.style.fill = randomCoatColor;
  coatColorField.value = randomCoatColor;
};

var setWizardEyesColor = function () {
  var randomEyesColor = getRandomValue(EYES_COLORS);
  var eyesColorField = setupForm.querySelector('[name=eyes-color]');

  setupWizardEyes.style.fill = randomEyesColor;
  eyesColorField.value = randomEyesColor;
};

var setWizardFireBallColor = function () {
  var randomFireballColor = getRandomValue(FIREBALL_COLORS);
  var fireBallColorField = setupForm.querySelector('[name=fireball-color]');

  setupWizardFireball.style.background = randomFireballColor;
  fireBallColorField.value = randomFireballColor;
};

var onPlayerPress = function (evt) {

  if (evt.target === setupWizardCoat) {
    setWizardCoatColor();
  } else if (evt.target === setupWizardEyes) {
    setWizardEyesColor();
  } else if (evt.target.closest('.setup-fireball-wrap')) {
    setWizardFireBallColor();
  }
};

var getValidityMessage = function (valueLength) {
  var validityMessage = '';

  if (valueLength === 0) {
    validityMessage = 'Введите имя вашего мага (минимум ' + MIN_NAME_LENGTH + ' симв.)';
  } else if (valueLength < MIN_NAME_LENGTH) {
    validityMessage = 'Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.';
  } else if (valueLength > MAX_NAME_LENGTH) {
    validityMessage = 'Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.';
  }

  return validityMessage;
};

var onInputChange = function () {
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
  popupWindow.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  setupNameField.addEventListener('input', onInputChange);
  setupPlayer.addEventListener('click', onPlayerPress);
};

var closePopup = function () {
  popupWindow.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  setupNameField.removeEventListener('input', onInputChange);
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
