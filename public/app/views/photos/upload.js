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
    var d = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var img = encodeURIComponent(d);

    options = {
      url: '/photos/',
      type: 'POST',
      data: {img: d[2]},
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