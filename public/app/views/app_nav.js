//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var pubsub = require('utils/pubsub');

module.exports = Backbone.View.extend({
  el: ".footer-nav-actions",
  
  events: {
    'change .uploadPhoto': 'getPhoto'
  },

  initialize: function() {
    var _this = this;
    
    _this.listenTo(pubsub, 'footerNav:remove', _this.remove, _this);
  },

  getPhoto: function(e) {
    var $file = $(e.currentTarget)[0].files[0];
    pubsub.trigger('photo:render', $file);
  }
});