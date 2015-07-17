'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var urls = require('cnfig/urls');

Backbone.$ = $;

// Templates
var templateTag = require('templates/photos/tag.hbs');

module.exports = Backbone.View.extend({
  events: {
    'click .store': 'store',
    'keydown .autocomplete': 'autocomplete'
  },

  //Start Listen events
  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(this.model, 'change', this.render, this);
    this.listenTo(pubsub, 'caption:render', this.render, this);
    this.listenTo(pubsub, 'photo:tagged', this.clean, this);
  },

  render: function() {
    var template = templateTag( this.model.toJSON() );
    var $el = $(this.el);
    $el.html(template);
    $('#app-container').append($el);

    return this;
  },

  clean: function() {
    var $input = $(this.el).find('input');
    $input.val('').focus();
  },

  autocomplete: function(e) {
    var query = $(e.currentTarget).val();

    if (query.length) {
      $.get(urls.baseUrl + '/users/search/' + query)
      .then(function(res) {
        pubsub.trigger('autocomplete:render', res);
      });
    }
  }
});
