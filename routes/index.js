"use strict";
var app = require('express')();

app.get('/', function(req, res) {
  return res.render('layout');
});

app.get('/register', function(req, res) {
  res.render('register');
});

module.exports = app;