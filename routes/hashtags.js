//Dependencies
var app = require('express')();
var async = require('async');

//Libs
var checkAuth = require('../lib/checkAuth');

//Models
var Hashtag = require('../models/hashtag');

app.get('/hashtags/:query', function(req, res) {

  var name = req.params.query;
  Hashtag.find({name: new RegExp(name, 'i')}).exec(function(err, hashtags) {
      if (err) throw err;
      return res.json(hashtags);
  })
});

module.exports = app;