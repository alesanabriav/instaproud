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
  },

  render: function() {
    var template = templateTag( this.model.toJSON() );
    var $el = $(this.el);
    $el.html(template);
    $("#app-container").append($el);
  },
});


//each image should have name of the filter 