'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var http = require('utils/http');
var urls = require('config/urls');
var template = require('templates/photos/filters.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .select-image': 'selectImage'
  },

  //Start Listen events
  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(pubsub, 'photo:uploaded', this.render, this);
    this.listenTo(pubsub, 'app:next', this.store, this);
  },

  render: function(data) {
    this.$el.empty().append(template(data));
    $('#app-container').empty().append(this.$el);

    var count = $('.slidee').find('img').length;

    $('.slidee').css('width', (count*104)+'px');
    return this;
  },

  selectImage: function(e) {
    var filter = $(e.currentTarget).data('filter');
    var src = $('.img-active').find('img').data('original');
    var folderUser;

    if (filter === 'original') {
      $('.img-active').find('img').attr('src', src);
      return;
    }

    http.post('/api/photos/filter', {filter: filter, src: src}, function(res) {
      folderUser = res.photo.split('_')[0];
      $('.img-active').find('img').attr('src', 'images/' + folderUser + '/' + res.photo);
    });
  },

  store: function() {
    var getSrc = $('.img-active img').attr('src');
    console.log(getSrc);
    var src = getSrc.split('/')[2];
    console.log(src);
    pubsub.trigger('photo:store', src);
  }

});
