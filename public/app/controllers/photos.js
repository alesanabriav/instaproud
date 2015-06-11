"use strict";
var $ = require('jquery');
var Photos = require('views/photos/list');
var Photo = require('views/photos/item');
var PhotoLoad = require('views/photos/load');
var PhotoCrop = require('views/photos/crop');
var PhotoUpload = require('views/photos/upload');
var PhotoFilter = require('views/photos/filter');
var PhotoStore = require('views/photos/store');
var PhotoCaption = require('views/photos/caption');
var PhotoAutocomplete = require('views/photos/tag_autocomplete');
var PhotoHashtag = require('views/photos/hashtag');
var PhotoSearch = require('views/photos/search');
var PhotoAutocompleteHashtag = require('views/photos/autocomplete_hashtag');
var PhotoAutocompleteUser = require('views/photos/autocomplete_user');

var models = require('models/photo');
var CommentModels = require('models/comment');

var PageSlider = require('utils/pageslider');
var slider = new PageSlider($('#app-container'));

var pubsub = require('utils/pubsub');

module.exports = {
  initialize: function() {

  },

  list: function() {
    var collection = new models.photos();
    new Photos({collection: collection});
    collection.fetch({reset: true});
  },

  item: function(id) {
    var model = new models.photo({id: id});
    var view = new Photo({model: model});
    model.fetch();
    slider.slidePage(view.el);
  },

  upload: function() {
    return new PhotoUpload();
  },

  render: function() {
    return new PhotoLoad();
  },

  crop: function() {
    return new PhotoCrop();
  },

  filter: function(src) {
    var data;
    var folder = src.split("_");

    pubsub.trigger('appHeader:change', {
      title: "Editar Imagen", bgColor: "444"
    });
    pubsub.trigger('footerNav:remove');
    pubsub.trigger('appHeader:showNext');

    new PhotoFilter();
    new PhotoStore();
    data = {"original": src, "folder": folder[0]};
    pubsub.trigger("photo:uploaded", data);
  },

  caption: function(id) {
    var photo = new models.photo({id: id});
    new PhotoCaption({model: photo});
    photo.fetch();
  },

  autocomplete: function(id) {
    var photo = new models.photo({id: id});
    return new PhotoAutocomplete({model: photo});
    photo.fetch();
  },

  hashtag: function(hashtag) {
    var headerData = {title: "#"+hashtag};
    pubsub.trigger('appHeader:change', headerData);
    var view = new PhotoHashtag();
    view.pull(hashtag);
  },

  search: function() {
    var view = new PhotoSearch();
    new PhotoAutocompleteHashtag();
    new PhotoAutocompleteUser();
    $("#app-container").empty();
    $("#app-container").append(view.render().el);
  }

 }