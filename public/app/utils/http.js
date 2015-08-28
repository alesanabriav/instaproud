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
      url: url,
      data: JSON.stringify(data)
    })
    .then(next)
    .fail(function(res) {
      next(null, JSON.parse(res.responseText));
    });
  },

  get: function(url, data, next) {
    $.ajax({
      type: 'GET',
      cache: true,
      url: url,
      data: data
    })
    .then(next);
  },

  put: function(url, data, next) {
    if (!data) data = {};
    $.ajax({
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      url: url,
      data: JSON.stringify(data),
      dataType: 'json'
    })
    .then(next);
  },

  delete: function(url, next) {
    $.ajax({
      type: 'DELETE',
      url: url
    })
    .then(next);
  },

  upload: function(url, fileName, file, next) {
    var formData = new FormData();
    formData.append(fileName, file);

    $.ajax({
      url: url,
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
