"use strict";

var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var template = require('templates/photos/search.hbs');
var urls = require('config/urls');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'keyup .search': 'search',
    'click .change-type': 'changeType'
  },

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
  },

  render: function() {
    var _this = this;
    _this.$el.empty();
    _this.$el.append( template() );
    return _this;
  },

  changeType: function(e) {
    e.preventDefault();
    var $current = $(e.currentTarget);
    var type = $current.data('type');
    var $search = this.$el.find('.search');
    $('.nav-tabs').find('li').removeClass('active');
    $current.parent().addClass('active');
    $search.data('type', type);
    this.search($search);
  },

  search: function(e) {

    if (e.currentTarget) {
      var $current = $(e.currentTarget);
    } else {
      var $current = e;
    }

    var query = $current.val();
    var type = $current.data('type');
    if (query.length >  2) {
      if (type === "users") {

        $.get(urls.baseUrl+"/users/search/"+ query)
        .then(function(res) {
          pubsub.trigger("autocompleteUser:render", res);
        });

      } else if(type === "hashtags") {

        $.get(urls.baseUrl+"/api/hashtags/"+ query)
        .then(function(res) {
          pubsub.trigger("autocompleteHashtag:render", res);
        });

      }
    }
  }

});
