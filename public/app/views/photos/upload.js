//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
Backbone.$ = $;
var pubsub = require('utils/pubsub');
var imagesloaded = require('imagesloaded');
module.exports = Backbone.View.extend({

  initialize: function() {
    pubsub.on("photo:upload", this.upload, this);
  },

  //Upload photo to server
  upload: function(data) {
    options = {
      url: '/photos',
      type: 'POST',
      data: data,
      processData: false, //Avoid be processed by jquery
      contentType: false, //Not set any content type header
      beforeSend: function() {
        $('.preloader').removeClass('hidden');
      }
    };

    ajx = $.ajax(options);

    ajx.then(function(data) {
      pubsub.trigger("photo:uploaded", data);
      $('.preloader').addClass('hidden');
    });
  }


});