'use strict';
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var uploadFile = require('utils/upload_file');
var alertify = require('alertifyjs');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, 'view:remove', _this.remove, _this);
    _this.listenTo(pubsub, 'photo:render', _this.uploadPhoto, _this);
  },

  uploadPhoto: function(file) {
    alertify.warning('Subiendo imagen... Tenga en cuenta que su conexion podria afectar el tiempo de espera.');

    uploadFile(file, 'original_image', '/api/photos/compress', function(res) {
      $('#app-container')
      .empty()
      .append('<img src="' + res + '" />');
      pubsub.trigger('navigator:change', '#crop');
    });
  },

  loadPhoto: function(file) {
    var $container = $('#app-container');
    var img;
    var reader;

    if (file.type.match(/image.*/)) {
      img = new Image();
      reader = new FileReader();

      reader.onload = function() {
        //localStorage.setItem('imageToCrop', reader.result);
        img.src = reader.result;
        $container
        .empty()
        .append(img)
        .find('img')
        .addClass('hidden');
      };

      reader.readAsDataURL(file);

      $('.preloader').removeClass('hidden');

      return _.delay(function() {
        pubsub.trigger('navigator:change', '#crop');
      }, 400);

    }

    alert('Tipo de archivo no permitido');
  }

});