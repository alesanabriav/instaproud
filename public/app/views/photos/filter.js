//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
var imagesloaded = require('imagesloaded');
var preload = 
Backbone.$ = $;
var pubsub = require('utils/pubsub');

// Templates
templateFilters = require('templates/photos/filters.hbs')

module.exports = Backbone.View.extend({
  events: {
    "click .select-image": "selectImage"
  },
  
  //Start Listen events
  initialize: function() {
    pubsub.on("photo:cropped", this.render, this);
  },

  render: function(data) {
    var t = templateFilters(data);
    var $el = $(this.el);
    $el.html(t);

    pubsub.trigger('footerNav:remove');

    $("#app-container").html($el);

    $('.load-image').on('error', function(e) {
      var $el = $(e.currentTarget);
      var src = $(e.currentTarget).attr('src');
      $(e.currentTarget).attr('src', src);
    });

  },

  selectImage: function(e) {
    var $img = $(e.currentTarget).find('img');
    var selected = $img.attr('src');
    $('.img-active').find('img').attr('src', selected );
  }
});