/* eslint-disable no-console */
'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var RESPONSE_TYPE = 'json';
  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  window.backend = {};
  var ResponseCode = {
    OK: 200,
    NOT_FOUND: 404,
    UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  };

  var responseHandler = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ResponseCode.OK:
          onLoad(xhr.response);
          break;
        case ResponseCode.NOT_FOUND:
          onError('Запрашиваемыe данные не существуют!');
          break;
        case ResponseCode.UNAVAILABLE:
          onError('Ошибка сервера, побробуйте снова позже');
          break;
        case ResponseCode.GATEWAY_TIMEOUT:
          onError('Слишком долгое ожидание ответа сервера, возможно медленное интернет-соединение');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Проверьте соединение');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;

    responseHandler(xhr, onSuccess, onError);

    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  window.backend.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;

    responseHandler(xhr, onSuccess, onError);

    xhr.open('POST', DOWNLOAD_URL);
    xhr.send();
  };

})();
