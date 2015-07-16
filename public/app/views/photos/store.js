'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var urls = require('config/urls');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, 'view:remove', _this.remove, _this);
    _this.listenTo(pubsub, 'photo:store', _this.store, _this);
  },

  store: function(src) {
    $('.preloader').removeClass('hidden');
    $.post(urls.baseUrl + '/api/photos', {src: src})
    .then( function(res) {
      pubsub.trigger('activity:store', {text: 'compartio una nueva foto', photo: res.id});
      pubsub.trigger('navigator:change', 'caption/' + res.id);
    });
  }
});
