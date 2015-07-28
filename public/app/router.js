'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var AppController = require('controllers/app');
var photosController = require('controllers/photos');
var profilesController = require('controllers/profiles');
var activitiesController = require('controllers/activities');

Backbone.$ = $;

module.exports = Backbone.Router.extend({
  routes: {
    'login': 'login',
    'logout': 'logout',
    'register': 'register',
    'profile/:id/edit': 'profileEdit',
    '': 'feed',
    'crop': 'crop',
    'filter': 'filters',
    'caption': 'caption',
    'profile/:username': 'profileShow',
    'tagged/:username': 'profileTagged',
    'hashtag/:hashtag': 'hashtagPhotos',
    'photo/:id': 'photoShow',
    'search': 'photoSearch',
    'activity': 'activity'
  },

  execute: function(callback, args) {
    AppController.initialize();
    $(document).scrollTop(0);
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
    photosController.crop();
  },

  filters: function() {
    photosController.filter();
  },

  caption: function() {
    photosController.caption();
  },

  feed: function() {
    photosController.list();
  },

  photoShow: function(id) {
    photosController.item(id);
  },

  profileEdit: function(id) {
    var user = JSON.parse(localStorage.getItem('user'));
    if(user.id === id) {
      profilesController.edit(id);
    }
  },

  profileShow: function(username) {
    profilesController.item(username);
  },

  profileTagged: function(username) {
    var getUsername = username;

    if (!username) {
      var getUser = localStorage.getItem('user');
      getUsername = JSON.parse(getUser).username;
    }

    profilesController.tagged(getUsername);
  },

  hashtagPhotos: function(hashtag) {
    photosController.hashtag(hashtag);
  },

  photoSearch: function() {
    photosController.search();
  },

  activity: function() {
    activitiesController.feed();
  }
});
