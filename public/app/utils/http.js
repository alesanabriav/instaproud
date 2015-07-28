'use strict';
var $ = require('jquery');
var urls = require('config/urls');

module.exports = {
  post: function(url, data, next) {
    if (!data) data = {};

    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      url: urls.baseUrl + url,
      data: data
    })
    .then(next);
  },

  get: function(url, data, next) {
    $.ajax({
      type: 'GET',
      url: urls.baseUrl + url,
      data: data
    })
    .then(next);
  },

  put: function(url, data, next) {
    if (!data) data = {};
    $.ajax({
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      url: urls.baseUrl + url,
      data: JSON.stringify(data),
      dataType: 'json'
    })
    .then(next);
  },

  delete: function(url, next) {
    $.ajax({
      type: 'DELETE',
      url: urls.baseUrl + url
    })
    .then(next);
  },

  upload: function(url, fileName, file, next) {
    var formData = new FormData();
    formData.append(fileName, file);

    $.ajax({
      url: urls.baseUrl + url,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false
      })
    .then(function(res) {
      return next(res);
    });
  }
};
