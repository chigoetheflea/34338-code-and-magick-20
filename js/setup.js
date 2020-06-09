'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

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
popupWindow.classList.remove('hidden');

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
