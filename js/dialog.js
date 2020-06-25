'use strict';

(function () {
  var popupSetup = document.querySelector('.setup');
  var dragLever = popupSetup.querySelector('.upload');

  var onDragLeverMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var onDragLeverMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      isDragged = true;

      var newCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      popupSetup.style.top = (popupSetup.offsetTop - newCoords.y) + 'px';
      popupSetup.style.left = (popupSetup.offsetLeft - newCoords.x) + 'px';
    };

    var onDragLeverMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onDragLeverMouseMove);
      document.removeEventListener('mouseup', onDragLeverMouseUp);
      document.removeEventListener('mousedown', onDragLeverMouseDown);

      if (isDragged) {
        var onDragLeverClick = function (clickEvt) {
          clickEvt.preventDefault();

          dragLever.removeEventListener('click', onDragLeverClick);
        };

        dragLever.addEventListener('click', onDragLeverClick);
      }
    };

    document.addEventListener('mousemove', onDragLeverMouseMove);
    document.addEventListener('mouseup', onDragLeverMouseUp);
  };

  dragLever.addEventListener('mousedown', onDragLeverMouseDown);

  window.dialog = {
    resetSetupPosition: function (coords) {
      popupSetup.style.top = coords.top + 'px';
      popupSetup.style.left = coords.left + 'px';
    }
  };
})();
