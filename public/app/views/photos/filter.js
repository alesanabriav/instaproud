//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
var imagesloaded = require('imagesloaded');
var pubsub = require('utils/pubsub');
Backbone.$ = $;

// Templates
templateFilters = require('templates/photos/filters.hbs')

module.exports = Backbone.View.extend({
  events: {
    "click .select-image": "selectImage"
  },
  
  //Start Listen events
  initialize: function() {
    pubsub.on("photo:uploaded", this.render, this);
    pubsub.on('app:next', this.select, this);
  },

  render: function(data) {
    var template = templateFilters(data);
    var $el = $(this.el);
    $el.html(template);

    pubsub.trigger('footerNav:remove');

    $("#app-container").html($el);

    $('.load-image').on('error', function(e) {
      var $el = $(e.currentTarget);
      var src = $(e.currentTarget).attr('src');
      $(e.currentTarget).attr('src', src);
    });
  },

  selectImage: function(e) {
    var filter = $(e.currentTarget).data('filter');
    var src = $('.img-active').find('img').data('original');
    var ajx = $.ajax({
      type: "POST",
      url: '/photos/filter', 
      data: {filter: filter, src: src}
    });

    ajx.then(function(res){
      $('.img-active').find('img').attr('src', "/images/"+res.photo);
    });
    // var selected = $img.attr('src');

    // 
  },

  select: function() {
    var src = $(".img-active img").attr('src');
    console.log(src);
  }
});


//each image should have name of the filter 