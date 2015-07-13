'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var loadImages = require('utils/loadImages');
var template = require('templates/profile/tagged.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .image-open': 'open'
  },

  /** Start Listen events */
  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
  },

  /**
   * attach template with data
   * @param {object} data
   * @return {object} this
   */
  render: function(data) {
    this.$el
    .empty()
    .append(template( data ));

    $('#app-container')
    .empty()
    .append(this.$el);
    loadImages();

    return this;
  }

});
