'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var urls = require('config/urls');
var templateTag = require('templates/photos/tag.hbs');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .store': 'store',
    'keyup .autocomplete': 'autocomplete'
  },

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(_this.model, 'change', _this.render, _this);
    _this.listenTo(pubsub, 'view:remove', _this.remove, _this);
    _this.listenTo(pubsub, 'caption:render', _this.render, _this);
    _this.listenTo(pubsub, 'photo:tagged', _this.clean, _this);
  },

  render: function() {
    var template = templateTag( this.model.toJSON() );
    var $el = $(this.el);
    $el.html(template);
    $('#app-container').append($el);
    return this;
  },

  clean: function() {
    var _this = this;
    $(_this.el).find('input').val('');
    $(_this.el).find('input').focus();
  },

  autocomplete: function(e) {
    var query = $(e.currentTarget).val();

    if (query.length > 2) {
      $.get(urls.baseUrl+'/users/search/'+ query)
      .then(function(res) {
        pubsub.trigger('autocomplete:render', res);
      });
    }
  }
});
