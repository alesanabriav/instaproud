"use strict";
var $ = require('jquery');
var urls = require('config/urls');

module.exports = {
  preloaderShow: function() {
    return $('.preloader').removeClass('hidden');
  },

  post: function(url, data, cb) {

    $.ajax({
      type: "POST",
      url: urls.baseUrl + url,
      data: data,
      beforeSend: this.preloaderShow
    })
    .then(function(res){
      $('.preloader').addClass('hidden');
      return cb(res);
    });
  },

  get: function(url, data, cb) {
    $.ajax({
      type: "GET",
      url: urls.baseUrl + url,
      beforeSend: this.preloaderShow
    })
    .then(function(res){
      $('.preloader').addClass('hidden');
      return cb(res);
    });

  },

  put: function() {
    $.ajax({
      type: "PUT",
      url: urls.baseUrl + url,
      data: data,
      beforeSend: this.preloaderShow
    })
    .then(function(res){
      $('.preloader').addClass('hidden');
      return cb(res);
    });
  },

  delete: function() {
    $.ajax({
      type: "DELETE",
      url: urls.baseUrl + url,
      beforeSend: this.preloaderShow
    })
    .then(function(res){
      $('.preloader').addClass('hidden');
      return cb(res);
    });

  }
}