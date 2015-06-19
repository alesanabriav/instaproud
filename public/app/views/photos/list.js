"use strict";

var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var loadImages = require('utils/loadImages');
var itemView = require('views/photos/item');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .load-more': 'loadMore'
  },

  initialize: function() {
    var _this = this;

    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "general:scroll", _this.loadMore, _this);
    _this.listenTo(_this.collection, 'reset', _this.render);
    _this.listenTo(_this.collection, 'add', _this.addMore);
    _this.photosSkip = 5;
  },

  addMore: function(model) {
    var _this = this;
    var view;
    view = new itemView({model: model});
    _this.$el.append(view.render().el);
    loadImages();
  },

  render: function() {
    var _this = this;
    var views = [];
    var view;

    _this.collection.each(function(model) {
      view = new itemView({model: model});
      views.push(view.render().el);
    });

    _this.$el.empty().append(views);

    $("#app-container")
    .empty()
    .append(_this.el);

    loadImages();
  },

  loadMore: function(e) {
    if (e) e.preventDefault();

    var _this = this;
    var skip = _this.photosSkip + 5;
    _this.collection.fetch({data: {photosSkip: skip}});
    _this.photosSkip = skip;
  }
});