"use strict";
global.jQuery = require("jquery");
var $ = jQuery;
var React = require('react');

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
var Search = require('views/photos/search.jsx');
var PhotoAutocompleteHashtag = require('views/photos/autocomplete_hashtag');
var PhotoAutocompleteUser = require('views/photos/autocomplete_user');

var models = require('models/photo');
var CommentModels = require('models/comment');

var pubsub = require('utils/pubsub');
var loadImages = require('utils/loadImages');
var React = require('react');
var List = require('views/photos/list.jsx');

module.exports = {

  list: function() {
    var collection = new models.photos();
    new Photos({collection: collection});
    collection.fetch({reset: true});
    // React.render(<List />, document.getElementById('app-container'));
  },

  item: function(id) {
    var model = new models.photo({id: id});
    var view = new Photo({model: model});

    model.fetch({
      success: function() {
        $('#app-container').empty().append(view.el);
        loadImages();
      }
    });

  },

  upload: function() {
    return new PhotoUpload();
  },

  render: function() {
    return new PhotoLoad();
  },

  crop: function() {
    pubsub.trigger('footerNav:remove');
    pubsub.trigger('appHeader:showNext');
    pubsub.trigger('appHeader:showBack');
    var view = new PhotoCrop();
    view.startCrop();
  },

  filter: function(src) {
    var folder = src.split("_");
    var data = {"original": src, "folder": folder[0]};

    pubsub.trigger('appHeader:change', {
      title: "Editar Imagen", bgColor: "444"
    });

    pubsub.trigger('footerNav:remove');
    pubsub.trigger('appHeader:showClose');
    pubsub.trigger('appHeader:showNext');

    new PhotoFilter();
    new PhotoStore();

    pubsub.trigger("photo:uploaded", data);
  },

  caption: function(id) {
    pubsub.trigger('appHeader:change', {
      title: "Compartir Imagen", bgColor: "444"
    });

    pubsub.trigger('footerNav:remove');
    pubsub.trigger('appHeader:showCheck');

    var photo = new models.photo({id: id});
    var view = new PhotoCaption({model: photo});
    photo.fetch({success: function() {
      $("#app-container")
      .empty()
      .append(view.render().el);
    }});

  },

  autocomplete: function(id) {
    var photo = new models.photo({id: id});
    return new PhotoAutocomplete({model: photo});
    photo.fetch();
  },

  hashtag: function(hashtag) {
    pubsub.trigger('appHeader:change', {title: "#"+hashtag});
    console.log('hashtag');
    var view = new PhotoHashtag();
    view.pull(hashtag);
  },

  search: function() {
    // var view = new PhotoSearch();
    // new PhotoAutocompleteHashtag();
    // new PhotoAutocompleteUser();
    // $("#app-container")
    // .empty()
    // .append(view.render().el);
    //
    React.render(<Search />, document.getElementById("app-container"));
  }

 }