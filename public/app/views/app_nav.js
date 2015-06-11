//Dependencies
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var templateNav = require('templates/app_nav.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'change input': 'getPhoto'
  },

  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, 'footerNav:remove', _this.close, _this);
  },

  close: function() {
    var _this = this;
    _this.remove();
    _this.stopListening();
  },

  render: function() {
    var _this = this;
    _this.$el.empty();
    _this.$el.append(templateNav());
    return _this;
  },

  getPhoto: function(e) {
    var $file = $(e.currentTarget)[0].files[0];
    pubsub.trigger('photo:render', $file);
  }
});