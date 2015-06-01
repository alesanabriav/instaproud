//Dependencies
global.jQuery = require("jquery");
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
var imagesloaded = require('imagesloaded');
var pubsub = require('utils/pubsub');
Backbone.$ = $;

// Templates
var templateTag = require('templates/photos/tag.hbs')

module.exports = Backbone.View.extend({
  events: {
    "click .store": "store",
    "keydown .autocomplete": "autocomplete"
  },
  
  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(_this.model, "change", _this.render, _this);
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "caption:render", _this.render, _this);
    _this.listenTo(pubsub, "photo:tagged", _this.clean, _this);
  },

  render: function() {
    var _this = this;
    var template = templateTag( _this.model.toJSON() );
    var $el = $(_this.el);
    $el.html(template);
    $("#app-container").append($el);
  },

  clean: function() {
    var _this = this;
    $(_this.el).find('input').val('');
    $(_this.el).find('input').focus();
  },

  autocomplete: function(e) {
    var query = $(e.currentTarget).val();
    
    if (query.length) {
      $.ajax({
        url: "/users/search/"+ query,
        method: "GET"
      })
      .then(function(res) {
        pubsub.trigger('autocomplete:render', res);
      });
    };
  }
});


//each image should have name of the filter 