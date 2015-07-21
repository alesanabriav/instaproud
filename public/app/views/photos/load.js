'use strict';
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var uploadFile = require('utils/upload_file');
var alertify = require('alertifyjs');
var mobile = require('is-mobile');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, 'view:remove', _this.remove, _this);
    _this.listenTo(pubsub, 'photo:render', _this.showDependDevice, _this);
  },

  showDependDevice: function(file) {
    console.log(mobile());
    if (mobile()) {
     this.uploadPhoto(file);
    } else {
      this.loadPhoto(file);
    }
  },

  uploadPhoto: function(file) {
    alertify.warning('Subiendo imagen... Tenga en cuenta que su conexion podria afectar el tiempo de espera.');

    uploadFile(file, 'original_image', '/api/photos/compress', function(res) {
      $('#app-container')
      .empty()
      .append('<img src="' + res + '" width="500" />');
      pubsub.trigger('navigator:change', '#crop');
    });
  },

  loadPhoto: function(file) {
    var reader;

    if (file.type.match(/image.*/)) {
      reader = new FileReader();

      reader.onload = function() {
        $('#app-container').empty().append('<img src="' + reader.result + '" width="100%" />');
      };

      reader.readAsDataURL(file);

      return _.delay(function() {
        pubsub.trigger('navigator:change', '#crop');
      }, 400);

    } else {
      alertify.error('Tipo de archivo no permitido');
    }
  }
});
