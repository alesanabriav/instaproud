'use strict';
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var loadImages = require('utils/loadImages');
var ItemView = require('views/photos/item');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .load-more': 'loadMore'
  },

  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(pubsub, 'general:scroll', this.loadMore, this);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'add', this.addMore);
    this.photosSkip = 5;
  },

  addMore: function(model) {
    var _this = this;
    var view;
    view = new ItemView({model: model});
    _this.$el.append(view.render().el);
    _.delay(loadImages, 500);
  },

  render: function() {
    var _this = this;
    var views = [];
    var view;

    _this.collection.each(function(model) {
      view = new ItemView({model: model});
      views.push(view.render().el);
    });

    _this.$el.empty().append(views);

    $('#app-container')
    .empty()
    .append(_this.el);
    _.delay(loadImages, 500);

    return this;
  },

  loadMore: function(e) {
    if (e) e.preventDefault();

    var _this = this;
    var skip = _this.photosSkip + 5;
    _this.collection.fetch({data: {photosSkip: skip}});
    _this.photosSkip = skip;
  }
});
