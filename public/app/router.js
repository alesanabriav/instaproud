//Dependencies
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

//Utils
var pubsub = require('utils/pubsub');

//Controllers
var AppController = require('controllers/app');
var photosController = require('controllers/photos');
var profilesController = require('controllers/profiles');

module.exports = Backbone.Router.extend({
  routes: {
    '': "feed",
    'filter/:src': "filters",
    'caption/:id': "caption",
    'profile/:id/edit': "profileEdit",
    'profile/:username': "profileShow",
    'profile': "profileShow",
    'tagged/:username': "profileTagged",
    'hashtag/:hashtag': "hashtagPhotos",
    "photo/:id": "photoShow",
    "search": "photoSearch"
  },

  /**
   * execute appropriate method when the url match
   * @params callback, args, name
   */
  execute: function(callback, args, name) {
    pubsub.trigger('view:remove');
    AppController.initialize();
    if (callback) callback.apply(this, args);
  },

   filters: function(src) {
    photosController.filter(src);
  },

  caption: function(id) {
    photosController.caption(id);
    photosController.autocomplete(id);
  },

  photoWork: function() {
    photosController.render();
    photosController.crop();
    photosController.upload();
  },

  feed: function() {
    photosController.list();
    this.photoWork();
  },

  photoShow: function(id) {
    photosController.item(id);
    this.photoWork();
  },

  profileEdit: function(id) {
    profilesController.edit(id);
  },

  profileShow: function(username) {
    var getUsername = username;

    if (!username) {
      var getUser = localStorage.getItem('user');
      getUsername = JSON.parse(getUser).username;
    };

    profilesController.item(getUsername);
    this.photoWork();
  },

  profileTagged: function(username) {
    var getUsername = username;

    if (!username) {
      var getUser = localStorage.getItem('user');
      getUsername = JSON.parse(getUser).username;
    };

    profilesController.tagged(getUsername);
    this.photoWork();
  },

  hashtagPhotos: function(hashtag) {
    photosController.hashtag(hashtag);
    this.photoWork();
  },

  photoSearch: function() {
    photosController.search();
    this.photoWork();
  }


});