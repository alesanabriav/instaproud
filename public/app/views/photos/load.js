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

    if (file.type.match(/image.*/)) {

      var reader = new FileReader();

      reader.onload = function() {
        var img = new Image();
        var $container = $("#app-container");
        img.src = reader.result;
        $container.empty().append(img);
        $container.find("img").addClass('hidden');
      };

      reader.readAsDataURL(file);

      var picture = $("#app-container");

      $('.preloader').removeClass('hidden');

      _.delay(function() {
        pubsub.trigger("photo:crop", picture.find('img'));
      }, 400);

    } else {
      alert("Tipo de archivo no permitido");
    }

  },

});