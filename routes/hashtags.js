//Dependencies
var app = require('express')();
var async = require('async');

//Libs
var checkAuth = require('../lib/checkAuth');

//Models
var Hashtag = require('../models/hashtag');

app.get('/hashtags/:query', function(req, res) {
  var name = req.params.query;

  Hashtag
  .find({name: new RegExp(name, 'i')})
  .populate('photos')
  .exec(function(err, hashtags) {
      if (err) throw err;
      return res.json(hashtags);
  })
});

app.get('/hashtags/:hashtag/photos', function(req, res) {
  var hashtag = "#"+req.params.hashtag;

  Hashtag.findOne({name: hashtag})
  .populate('photos')
  .exec(function(err, hash) {
    if (err) throw(err);

    return res.json(hash);
  })

});


module.exports = app;