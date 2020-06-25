'use strict';

(function () {
  var Keys = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };

  var setupNameField = document.querySelector('.setup-user-name');

  var isEscNotInput = function (evt) {
    return evt.key === Keys.ESC && evt.target !== setupNameField;
  };

  window.utility = {
    isEnterEvent: function (evt, action) {
      var isEnter = evt.key === Keys.ENTER;

      if (isEnter) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (isEscNotInput(evt)) {
        action();
      }
    }
  };
})();
