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
    'caption': 'caption',
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
    var hash = location.hash;
    AppController.initialize();
    if (hash === '#login' || hash === '#register') {
      React.unmountComponentAtNode(document.getElementById('header-container'));
      React.unmountComponentAtNode(document.getElementById('nav-container'));
    }
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
