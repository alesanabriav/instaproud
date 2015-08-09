'use strict';
var Backbone = require('backbone');
var AppController = require('controllers/app');
var photosController = require('controllers/photos');
var profilesController = require('controllers/profiles');
var activitiesController = require('controllers/activities');

module.exports = Backbone.Router.extend({
  routes: {
    '': function(){
      photosController.list();
    },
    'photo/:id': function(id) {
      photosController.item(id);
    },
    'search': function(){
      photosController.search();
    },
    'activity': function(){
      activitiesController.feed();
    },
    'profile/:username': function(username) {
      profilesController.item(username);
    },
    'tagged/:username': function(username) {
      profilesController.tagged(username);
    },
    'login': function() {
      profilesController.login();
    },
    'logout': function() {
      profilesController.logout();
    },
    'register': function() {
      profilesController.register();
    },
    'profile/:id/edit': function(id) {
      profilesController.edit(id);
    },
    'profile/:id/password': function(id) {
      profilesController.changePassword(id);
    },
    'map': function() {
      photosController.map();
    },
    'crop': function() {
      photosController.crop();
    },
    'filter': function(){
      photosController.filter();
    },
    'caption': function() {
      photosController.caption();
    },
    'hashtag/:hashtag': function(hashtag) {
      photosController.hashtag(hashtag);
    }
  },

  initialize: function() {

  },

  execute: function(callback, args) {
    AppController.initialize();
    activitiesController.initialize();
    if (callback) callback.apply(this, args);
  }
});
