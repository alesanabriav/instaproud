"use strict";

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "photo:render", _this.loadPhoto, _this);
  },

  loadPhoto: function(file) {
    var $container = $("#app-container");
    var img;
    var reader;

    if (file.type.match(/image.*/)) {
      img = new Image();
      reader = new FileReader();

      reader.onload = function() {
        localStorage.setItem("imageToCrop", reader.result);
        img.src = reader.result;
        $container
        .empty()
        .append(img)
        .find("img")
        .addClass('hidden');
      };

      reader.readAsDataURL(file);

      $('.preloader').removeClass('hidden');

      return _.delay(function() {
        pubsub.trigger('navigator:change', "#crop");
      }, 400);

    }

    alert("Tipo de archivo no permitido");
  }

});