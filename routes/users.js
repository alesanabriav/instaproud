var express = require('express');
var app = express();
var User = require('../models/user');

app.route('/users/:id?')
  .all(function(req, res, next){

    // set all responses to json type
    res.set('Content-Type','application/json');

    //continue next method
    next();
  })
  .post(function(req, res, next) {

    var data = req.body;

    var newUser = new User(data);

    newUser.save(function(err, a){
      if (err) return handleError(err);
      console.log(a);
    });

    return res.status(201).json(newUser);

  });

module.exports = app;
