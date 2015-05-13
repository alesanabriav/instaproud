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
    'change .uploadPhoto': 'uploadPhoto'
  },

  initialize: function() {
    pubsub.on('footerNav:remove', this.remove, this);
  },

  uploadPhoto: function(e) {
    var $file = $(e.currentTarget)[0].files[0];
    pubsub.trigger('photo:render', $file);
  }
});