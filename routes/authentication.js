var app = require('express')();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
});

app.get('/login', function(req, res) {
  res.render('login', {layout: 'login'});
});

module.exports = app;