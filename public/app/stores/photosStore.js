'use strict';
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var $http = require('utils/http');
var CHANGE_EVENT = 'change';

module.exports = _.extend({}, EventEmitter.prototype, {
  skip: 0,
  hasMore: true,

  getStarred: function(next) {
    $http.get('/api/photos/starred', null, function(res) {
      next(res);
    }.bind(this));
  },

  getAll: function() {
    var photos = [];
    this.getStarred(function(starred) {
      $http.get('/api/photos', null, function(res) {
        photos = [starred].concat(res);
        this.emit(CHANGE_EVENT, photos);
      }.bind(this));
    }.bind(this));
  },

  getMore: function(photos) {
    var skip = this.skip + 5;
    var data = {photosSkip: skip};
    var newPhotos = [];

    if (this.hasMore) {
      $http.get('/api/photos', data, function(res) {
        if (res.length === 0) {
          this.hasMore = false;
        }
        newPhotos = photos.concat(res);
        this.emit(CHANGE_EVENT, newPhotos);
      }.bind(this));

      this.skip = skip;
    }
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});
