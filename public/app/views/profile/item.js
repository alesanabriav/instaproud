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
    $('#app-container').empty().append(this.$el);
    return this;
  }

});
