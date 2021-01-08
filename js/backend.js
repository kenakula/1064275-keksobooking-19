'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var RESPONSE_TYPE = 'json';
  var DOWNLOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var UPLOAD_URL = 'https://javascript.pages.academy/keksobooking';
  var Method = {
    GET: 'GET',
    POST: 'POST',
  };
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
          onError('Ошибка сервера, попробуйте снова позже');
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

  var createXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;
    responseHandler(xhr, onSuccess, onError);

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);

    xhr.open(Method.GET, DOWNLOAD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);

    xhr.open(Method.POST, UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
