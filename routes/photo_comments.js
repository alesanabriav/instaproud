//Dependencies
var app = require('express')();

//libs
var createHashtag = require('../lib/createHashtag');

//Models
var User = require('../models/user');
var Photo = require('../models/photo');
var Comment = require('../models/comment');

app.route('/photos/:id/comments')
  .post(function(req, res) {
    var commentText = req.body.comment;
    var photoId = req.params.id;
    var data = {}
    var hashtags = commentText.match(/\#\w\w+\b/gm);

    var newComment = new Comment({text: commentText, commenter: req.user._id});

    newComment.save(function(err, comment) {
      if (err) throw(err);
      
      if (hashtags) {
        createHashtag.store(hashtags, photoId);
      };

      Photo.findOneAndUpdate({_id: photoId},{$addToSet: {comments: comment._id} }, function(err, photo) {
        if (err) throw(err);

        Comment.findOne({_id: comment._id}).populate('commenter').exec(function(err, commt) {
          return res.status(201).json(commt);
        })
        
      })

    });
  })
  .get(function(req, res) {

  });

module.exports = app;