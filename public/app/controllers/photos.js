"use strict";
global.jQuery = require("jquery");
var $ = jQuery;
var React = require('react');
var _ = require('underscore');
var Photos = require('views/photos/list');
var Photo = require('views/photos/item');
var PhotoStore = require('views/photos/store');
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
var Crop = require('views/photos/crop.jsx');
var Filter = require('views/photos/filter.jsx');
var Caption = require('views/photos/caption.jsx');

module.exports = {

  list: function() {
    // var collection = new models.photos();
    // new Photos({collection: collection});
    // collection.fetch({reset: true});
    React.render(<List />, document.getElementById('app-container'));
  },

  item: function(id) {
    var model = new models.photo({id: id});
    var view = new Photo({model: model});

    model.fetch({
      success: function() {
        $('#app-container').empty().append(view.el);
        _.delay(loadImages, 1000);
      }
    });

  },

  crop: function() {
    React.unmountComponentAtNode(document.getElementById('nav-container'));
    pubsub.trigger('appHeader:change', {bgColor: "444"});
    React.render(<Crop />, document.getElementById('app-container'));
  },

  filter: function(src) {
    React.unmountComponentAtNode(document.getElementById('nav-container'));
    React.render(<Filter />, document.getElementById('app-container'));
    pubsub.trigger('appHeader:change', {bgColor: "444"});
  },

  caption: function(id) {
    pubsub.trigger('appHeader:change', { bgColor: "444"});
    React.unmountComponentAtNode(document.getElementById('nav-container'));
    React.render(<Caption />, document.getElementById('app-container'));

    // pubsub.trigger('footerNav:remove');
    // pubsub.trigger('appHeader:showCheck');

    // var photo = new models.photo({id: id});
    // var view = new PhotoCaption({model: photo});
    // photo.fetch({success: function() {
    //   $("#app-container")
    //   .empty()
    //   .append(view.render().el);
    // }});

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