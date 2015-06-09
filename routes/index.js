var app = require('express')();
var Auth = require('../lib/checkAuth');

app.get('/', Auth, function(req, res) {
  return res.render('layout');
});

app.get('/register', function(req, res) {
  res.render('register');
});

module.exports = app;