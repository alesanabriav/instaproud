//Dependencies
global.jQuery = require("jquery");
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');

//Utils
var pubsub = require('utils/pubsub');
//Templates
var templateItem = require('templates/photos/hashtag.hbs');

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
    $.get('/hashtags/'+ hashtag +'/photos')
    .then(function(res) {
      pubsub.trigger("hashtag:render", res);
    });
  },

  render: function(data) {
    console.log(data);
    var _this = this;
    var template = templateItem( data );
    _this.$el.empty();
    _this.$el.append(template);
    $("#app-container").html(_this.$el);
    return _this;

  }

});