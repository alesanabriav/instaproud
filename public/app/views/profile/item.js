"use strict";

var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var unveil = require('unveil');
var templateItem = require('templates/profile/item.hbs');
var templatePhotos = require('templates/profile/photos.hbs');
var loadImages = require('utils/loadImages');
var urls = require('config/urls');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.photosSkip = 0;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "general:scroll", _this.loadMore, _this);
    _this.listenTo(pubsub, "profile:addPhotos", _this.loadMore, _this);
  },

  loadMore: function(e) {
    if (e) e.preventDefault();

    var _this = this;
    var skip = _this.photosSkip + 12;
    var username = JSON.parse(localStorage.getItem('user')).username;

    $.ajax({
      url: urls.baseUrl+'/api/users/'+ username +'/photos',
      method: 'GET',
      data: {photosSkip: skip}
    })
    .then(function(models) {

      _this.$el.find('.photos-grid').append(templatePhotos(models));
      loadImages();
    });
    _this.photosSkip = skip;
  },



  render: function(data) {
    var _this = this;
    _this.$el.empty()
    .append( templateItem( data ) );
    loadImages();
    return _this;
  }

});