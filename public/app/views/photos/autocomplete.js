//Dependencies
global.jQuery = require("jquery");
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
var imagesloaded = require('imagesloaded');
var pubsub = require('utils/pubsub');
Backbone.$ = $;

// Templates
var templateAutocomplete = require('templates/photos/autocomplete.hbs')

module.exports = Backbone.View.extend({
  events: {
    "click .select": "store",
  },
  
  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "autocomplete:render", _this.render, _this);
  },

  render: function(users) {
    var template = templateAutocomplete( users );
    var $el = $(this.el);
    $el.html(template);
    $("#app-container").append($el);
  },

  store: function(e) {
    e.preventDefault();

    var _this = this;
    var id = this.model.id;
    var userId = $(e.currentTarget).data('user');

    var data = {"tagged": userId};

    $.ajax({
      url: '/photos/'+ id +'/tagged',
      method: "POST",
      data: data
    })
    .then(function(res) {
      pubsub.trigger('photo:tagged', res);
      $(_this.el).find('.list-group').remove();
    });
  }

});