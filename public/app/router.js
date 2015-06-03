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
    'hashtag/:hashtag': "hashtagPhotos"
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

  feed: function() {
    photosController.render();
    
    photosController.crop();
    photosController.upload();
    photosController.list();
  },

  filters: function(src) {
    photosController.filter(src);
  },

  caption: function(id) {    
    photosController.caption(id);
    photosController.tag(id);
    photosController.autocomplete(id);
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
  },

  hashtagPhotos: function(hashtag) {
    photosController.hashtag(hashtag);
  }


});