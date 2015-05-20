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
    console.log('start photo render');
    pubsub.on("photo:render", this.render, this);
  },

  render: function(file) {
    var imageType = /image.*/;
    var img;

    if (file.type.match(imageType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        img = new Image();

        img.src = reader.result;

        $("#app-container").find("img");

        $("#app-container").html(img);
      };

      reader.readAsDataURL(file);
      
      var picture = $("#app-container");

      $('.preloader').removeClass('hidden');

      _.delay(function() {
         $('.preloader').addClass('hidden');
        pubsub.trigger("photo:crop", picture.find('img'));
      }, 400);

    } else {
      alert("File not supported!");
    }

    // var img = {img: "/uploads/"+data};
    // var t = templateCrop(img);
    // var $el = $(this.el);
    // var $image = $('.img-to-crop');
    // $el.html(t);
    // $("#app-container").html($el);
  },


});