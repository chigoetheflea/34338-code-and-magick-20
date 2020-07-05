'use strict';

(function () {
  var TIMEOUT = 10000;
  var TIMEOUT_UNIT = 'мс';
  var RESPONSE_TYPE = 'json';
  var SUCCESS_SAVE_MESSAGE = 'Ваш персонаж сохранен!';

  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var Url = {
    IN: 'https://javascript.pages.academy/code-and-magick/data',
    OUT: 'https://javascript.pages.academy/code-and-magick'
  };

  var ErrorMessage = {
    NOT_FOUND: 'Данные не найдены',
    SERVER_ERROR: 'Ошибка сервера',
    CONNECTION_LOST: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ',
    COMMON_ERROR: 'Статус ответа: '
  };

  var getErrorMessage = function (status, text) {
    switch (status) {
      case StatusCode.NOT_FOUND:
        return ErrorMessage.NOT_FOUND;

      case StatusCode.SERVER_ERROR:
        return ErrorMessage.SERVER_ERROR;
    }

    return ErrorMessage.COMMON_ERROR + status + ' ' + text;
  };

  var isLoad = function (xhr) {
    return xhr.status === StatusCode.OK;
  };

  var onDataFromServerLoad = function (xhr, onLoad, onError) {
    if (isLoad(xhr)) {
      onLoad(xhr.response, false);
    } else {
      onError(getErrorMessage(xhr.status, xhr.statusText));
    }

    xhr.removeEventListener('load', onDataFromServerLoad);
    xhr.removeEventListener('error', onDataFromServerErrorOccures);
    xhr.removeEventListener('timeout', onDataFromServerTimesUp);
  };

  var onDataToServerLoad = function (xhr, onLoad, onError) {
    if (isLoad(xhr)) {
      onLoad(SUCCESS_SAVE_MESSAGE, true);
    } else {
      onError(getErrorMessage(xhr.status, xhr.statusText));
    }

    xhr.removeEventListener('load', onDataToServerLoad);
    xhr.removeEventListener('error', onDataToServerErrorOccures);
    xhr.removeEventListener('timeout', onDataToServerTimesUp);
  };

  var onDataFromServerErrorOccures = function (onError) {
    onError(ErrorMessage.CONNECTION_LOST);
  };

  var onDataFromServerTimesUp = function (timeout, onError) {
    onError(ErrorMessage.TIMEOUT + timeout + TIMEOUT_UNIT);
  };

  var onDataToServerErrorOccures = function (onError) {
    onError(ErrorMessage.CONNECTION_LOST);
  };

  var onDataToServerTimesUp = function (timeout, onError) {
    onError(ErrorMessage.TIMEOUT + timeout + TIMEOUT_UNIT);
  };

  var createXHR = function () {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = createXHR();

      xhr.addEventListener('load', onDataFromServerLoad.bind(null, xhr, onLoad, onError));
      xhr.addEventListener('error', onDataFromServerErrorOccures.bind(null, onError));
      xhr.addEventListener('timeout', onDataFromServerTimesUp.bind(null, xhr.timeout, onError));

      xhr.open('GET', Url.IN);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = createXHR();

      xhr.addEventListener('load', onDataToServerLoad.bind(null, xhr, onLoad, onError));
      xhr.addEventListener('error', onDataToServerErrorOccures.bind(null, onError));
      xhr.addEventListener('timeout', onDataToServerTimesUp.bind(null, xhr.timeout, onError));

      xhr.open('POST', Url.OUT);
      xhr.send(data);
    }
  };
})();
