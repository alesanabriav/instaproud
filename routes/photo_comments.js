'use strict';
var app = require('express')();
var xssFilters = require('xss-filters');
var store = require(__base + 'lib/comments/store');
var tag = require(__base + 'lib/photos/tag');

app.route('/api/photos/:id/comments')
  .post(function(req, res) {
    var commentText = xssFilters.inHTMLData(req.body.comment);
    var photoId = req.params.id;
    var userId = req.user._id;
    tag(commentText, photoId, function() {

    });
    store(commentText, photoId, userId, function(err, comment) {
      if(err) return res.status(400).json(err);
      return res.status(201).json(comment);
    });
  });

module.exports = app;
