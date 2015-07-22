'use strict';
var $ = require('jquery');
var urls = require('config/urls');

module.exports = {
  post: function(url, data, cb) {
    $.ajax({
      type: 'POST',
      url: urls.baseUrl + url,
      data: data
    })
    .then(cb);
  },

  get: function(url, data, cb) {
    $.ajax({
      type: 'GET',
      url: urls.baseUrl + url,
      data: data
    })
    .then(cb);
  },

  put: function(url, data, cb) {
    $.ajax({
      type: 'PUT',
      url: urls.baseUrl + url,
      data: data
    })
    .then(cb);
  },

  delete: function(url, data, cb) {
    $.ajax({
      type: 'DELETE',
      url: urls.baseUrl + url
    })
    .then(cb);
  }
};
