"use strict";
var $ = require('jquery');
var urls = require('config/urls');

module.exports = function uploadFile(file, fileName, url, cb) {
  var formData = new FormData();
  formData.append(fileName, file);

  $.ajax({
    url: urls.baseUrl+url,
    type: 'POST',
    data: formData,
    processData: false, //Avoid be processed by jquery
    contentType: false, //Not set any content type header
    beforeSend: function() {
      $('.preloader').removeClass('hidden');
    }
    })
  .then(function(res) {
    $('.preloader').addClass('hidden');
    return cb(res);
  });
}