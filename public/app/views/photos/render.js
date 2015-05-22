//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
var imagesLoaded = require('imagesloaded');
var pubsub = require('utils/pubsub');
Backbone.$ = $;

// Templates
templateCrop = require('templates/photos/crop.hbs')

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

        img.src = reader.result;

        $("#app-container").find("img");

        $("#app-container").html(img);
      };

      reader.readAsDataURL(file);
      
      var picture = $("#app-container");

      $('.preloader').removeClass('hidden');

      _.delay(function() {
        pubsub.trigger("photo:crop", picture.find('img'));
        $('.preloader').addClass('hidden');
      }, 400);

    } else {
      alert("Tipo de archivo no permitido");
    }

  },

});