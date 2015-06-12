"use strict";

var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var templateItem = require('templates/photos/hashtag.hbs');
var urls = require('config/urls');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .image-open': 'open',
  },

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "hashtag:render", _this.render, _this);
  },

  pull: function(hashtag) {
    $.get(urls.baseUrl+'/api/hashtags/'+ hashtag +'/photos')
    .then(function(res) {
      pubsub.trigger("hashtag:render", res);
    });
  },

  render: function(data) {
    var _this = this;

    _this.$el
    .empty()
    .append( templateItem( data ) );

    $("#app-container")
    .empty()
    .append(_this.$el);

    return _this;
  }

});