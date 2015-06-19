"use strict";
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var AppController = require('controllers/app');
var photosController = require('controllers/photos');
var profilesController = require('controllers/profiles');
var activitiesController = require('controllers/activities');
Backbone.$ = $;

module.exports = Backbone.Router.extend({
  routes: {
    "login": "login",
    "register": "register",
    "profile/:id/edit": "profileEdit",
    "logout": "logout",
    "": "feed",
    "crop": "crop",
    "filter/:src": "filters",
    "caption/:id": "caption",
    "profile/:username": "profileShow",
    "profile": "profileShow",
    "tagged/:username": "profileTagged",
    "hashtag/:hashtag": "hashtagPhotos",
    "photo/:id": "photoShow",
    "search": "photoSearch",
    "activity": "activity"
  },

  /**
   * execute appropriate method when the url match
   * @params callback, args, name
   */
  execute: function(callback, args, name) {
    pubsub.trigger('view:remove');
    $(window).scrollTop(0);
    activitiesController.store();
    if (callback) callback.apply(this, args);
  },

  login: function() {
    profilesController.login();
  },

  logout: function() {
    profilesController.logout();
  },

  register: function() {
    profilesController.register();
  },

  crop: function() {
    AppController.initialize();
    photosController.crop();
    photosController.upload();
  },

  filters: function(src) {
    AppController.initialize();
    photosController.filter(src);
  },

  caption: function(id) {
    AppController.initialize();
    photosController.caption(id);
    photosController.autocomplete(id);
  },

  photoWork: function() {
    photosController.render();
  },

  feed: function() {
    photosController.list();
    AppController.initialize();
    this.photoWork();
  },

  photoShow: function(id) {
    AppController.initialize();
    this.photoWork();

    photosController.item(id);
  },

  profileEdit: function(id) {
    AppController.initialize();

    var user = JSON.parse(localStorage.getItem('user'));
    if(user.id === id) {
      profilesController.edit(id);
    }
  },

  profileShow: function(username) {
    var getUsername = username;
    var getUser;
    AppController.initialize();
    this.photoWork();

    if (!username) {
      getUser = localStorage.getItem('user');
      getUsername = JSON.parse(getUser).username;
    };

    profilesController.item(getUsername);
  },

  profileTagged: function(username) {
    var getUsername = username;

    if (!username) {
      var getUser = localStorage.getItem('user');
      getUsername = JSON.parse(getUser).username;
    };

    profilesController.tagged(getUsername);
    AppController.initialize();
    this.photoWork();
  },

  hashtagPhotos: function(hashtag) {
    photosController.hashtag(hashtag);
    AppController.initialize();
    this.photoWork();
  },

  photoSearch: function() {
    photosController.search();
    AppController.initialize();
    this.photoWork();
  },

  activity: function() {
    AppController.initialize();
    activitiesController.feed();

  }
});