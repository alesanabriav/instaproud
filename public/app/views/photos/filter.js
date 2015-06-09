"use strict";

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var template = require('templates/photos/filters.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    "click .select-image": "selectImage"
  },

  //Start Listen events
  initialize: function() {
    var _this = this;

    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "photo:uploaded", _this.render, _this);
    _this.listenTo(pubsub, "app:next", _this.store, _this);
  },

  render: function(data) {
    var _this = this;
    _this.$el.empty();
    _this.$el.append(template(data));
    $("#app-container").empty();
    $("#app-container").append(_this.$el);

    $('.load-image').on('error', function(e) {
      var $el = $(e.currentTarget);
      var src = $(e.currentTarget).attr('src');
      $(e.currentTarget).attr('src', src);
    });

    var count = $(".slidee").find('img').length;

    $(".slidee").css('width', (count*105)+'px');
  },

  selectImage: function(e) {

    var filter = $(e.currentTarget).data('filter');
    var src = $('.img-active').find('img').data('original');

    if (filter === "original") {
      $('.img-active').find('img').attr('src', src);
      return;
    };

    $.ajax({
      type: "POST",
      url: '/api/photos/filter',
      data: {filter: filter, src: src},
      beforeSend: function showPreloader() {
        $('.preloader').removeClass('hidden');
      }
    })
    .then(function(res){
      var folderUser = res.photo.split('_')[0];
      $('.img-active').find('img').attr('src', "/images/"+folderUser+"/"+res.photo);
      $('.preloader').addClass('hidden');
    });
  },

  store: function() {
    var getSrc = $(".img-active img").attr('src');
    var src = getSrc.split('/')[3];
    pubsub.trigger('photo:store', src);
  }

});