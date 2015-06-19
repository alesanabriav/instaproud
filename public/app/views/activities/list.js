"use strict";
var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var itemView = require('views/activities/item');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .load-more': 'loadMore'
  },

  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(_this.collection, 'reset', _this.render);
    _this.listenTo(_this.collection, 'add', _this.addMore);
    _this.activitiesSkip = 5;
  },

  addMore: function(model) {
    var _this = this;
    var view;
    view = new itemView({model: model});
    _this.$el.append(view.render().el);
  },

  render: function() {
    var _this = this;
    var views = [];
    var view;

    _this.collection.each(function(model) {
      view = new itemView({model: model});
      views.push(view.render().el);
    });

    _this.$el.empty()
    .append(views);

    $("#app-container")
    .empty()
    .append(_this.el);
  },

  loadMore: function(e) {
    if (e) e.preventDefault();

    var _this = this;
    var skip = _this.activitiesSkip + 5;
    _this.collection.fetch({data: {activitiesSkip: skip}});
    _this.activitiesSkip = skip;
  }
});