//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;
var pubsub = require('utils/pubsub');

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    pubsub.on("photo:crop", this.startCrop, this);
    pubsub.on("app:next", this.sendCrop, this);
  },

  startCrop: function() {
    var container = $("#app-container");
    var newCanvas = $("<canvas/>");
    container.append(newCanvas);​​​
  },

  sendCrop: function() {
    var picture = $('.img-to-crop');
    var data = picture.guillotine('getData');
    var src = {'src': picture.attr('src')};
    var data1 =  _.extend(data, src);
    var ajx = $.get('/photos', data1);

    ajx.then(function(data) {
      pubsub.trigger("photo:cropped", data);
    });
  }
});