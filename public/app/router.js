'use strict';
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var AppController = require('controllers/app');
var photosController = require('controllers/photos');
var profilesController = require('controllers/profiles');
var activitiesController = require('controllers/activities');

Backbone.$ = $;

module.exports = Backbone.Router.extend({
  routes: {
    'login': 'login',
    'register': 'register',
    'profile/:id/edit': 'profileEdit',
    'logout': 'logout',
    '': 'feed',
    'crop': 'crop',
    'filter': 'filters',
    'caption/:id': 'caption',
    'profile/:username': 'profileShow',
    'profile': 'profileShow',
    'tagged/:username': 'profileTagged',
    'hashtag/:hashtag': 'hashtagPhotos',
    'photo/:id': 'photoShow',
    'search': 'photoSearch',
    'activity': 'activity'
  },

  /**
   *
   * execute appropriate method when the url match
   * @params callback, args, name
   */
  execute: function(callback, args) {
    pubsub.trigger('view:remove');
    React.unmountComponentAtNode(document.getElementById('app-container'));
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

  filters: function() {
    AppController.initialize();
    photosController.filter();
  },

  caption: function(id) {
    AppController.initialize();
    photosController.caption(id);
    photosController.autocomplete(id);
  },

  feed: function() {
    photosController.list();
    AppController.initialize();

  },

  photoShow: function(id) {
    AppController.initialize();


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
    AppController.initialize();


    profilesController.item(username);
  },

  profileTagged: function(username) {
    var getUsername = username;

    if (!username) {
      var getUser = localStorage.getItem('user');
      getUsername = JSON.parse(getUser).username;
    }

    profilesController.tagged(getUsername);
    AppController.initialize();

  },

  hashtagPhotos: function(hashtag) {
    AppController.initialize();
    photosController.hashtag(hashtag);


  },

  photoSearch: function() {
    photosController.search();
    AppController.initialize();

  },

  activity: function() {
    AppController.initialize();
    activitiesController.feed();

  }
});
