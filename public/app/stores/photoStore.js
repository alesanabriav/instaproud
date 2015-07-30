'use strict';
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var $http = require('utils/http');
var pubsub = require('utils/pubsub');
var CHANGE_EVENT = 'change';

module.exports = _.extend({}, EventEmitter.prototype, {

  storeComment: function(id, text, comments) {
    var newComments;
    $http.post(
      '/api/photos/' + id + '/comments',
      {comment: text},
      function(res) {
        newComments = comments.concat([res]);
        this.emit(CHANGE_EVENT, newComments);
        pubsub.emit('activity:store', {text: 'comento: ' + text, photo: id});
    }.bind(this));
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
