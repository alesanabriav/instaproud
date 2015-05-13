//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;
var imagesLoaded = require('imagesloaded');
var pubsub = require('utils/pubsub');

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

    if (file.type.match(imageType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var img = new Image();
        img.src = reader.result;
        $("#app-container").html(img);
      }

      reader.readAsDataURL(file); 

      $("#app-container").imagesLoaded(function() {
        pubsub.trigger("photo:crop");
      });

    } else {
      fileDisplayArea.innerHTML = "File not supported!";
    }

    // var img = {img: "/uploads/"+data};
    // var t = templateCrop(img);
    // var $el = $(this.el);
    // var $image = $('.img-to-crop');
    // $el.html(t);
    // $("#app-container").html($el);
    
  
  },


});