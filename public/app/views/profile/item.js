'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var templateItem = require('templates/profile/item.hbs');
var templatePhotos = require('templates/profile/photos.hbs');
var loadImages = require('utils/loadImages');
var urls = require('config/urls');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  /** Start Listen events */
  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(pubsub, 'general:scroll', this.loadMore, this);
    this.listenTo(pubsub, 'profile:addPhotos', this.loadMore, this);
    this.photosSkip = 0;
  },

  /**
   * Get more photos from api
   * @param  {object} e jquery event
   */
  loadMore: function(e) {
    if (e) e.preventDefault();
    var skip = this.photosSkip + 1;
    var username = this.model.user.username;

    $.ajax({
      url: urls.baseUrl + '/api/users/' + username + '/photos',
      method: 'GET',
      data: {photosSkip: skip}
    })
    .then(function(models) {
      this.loadPhotos(models);
    }.bind(this));

    this.photosSkip = skip;
  },

  /**
   * attach template with photos
   * @return {object} this
   */
  loadPhotos: function(models) {
    this.$el.find('.photos-grid').append(templatePhotos(models));
    loadImages();
  },

  /**
   * attach template with data
   * @param {object} data
   * @return {object} this
   */
  render: function() {
    this.$el
    .empty()
    .append( templateItem( this.model ) );
    loadImages();
    return this;
  }

});
