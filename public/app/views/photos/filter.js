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
    var _this = this;

    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "photo:uploaded", _this.render, _this);
    _this.listenTo(pubsub, "app:next", _this.select, _this);
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

    $.ajax({
      type: "POST",
      url: '/photos/filter', 
      data: {filter: filter, src: src},
      beforeSend: function showPreloader() {
        $('.preloader').removeClass('hidden');
      }
    })
    .then(function(res){
      $('.img-active').find('img').attr('src', "/images/"+res.photo);
      $('.preloader').addClass('hidden');
    });
  },

  select: function() {
    var getSrc = $(".img-active img").attr('src');
    var src = getSrc.split('/')[2];
    
  }
});


//each image should have name of the filter 