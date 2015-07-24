'use strict';
var React = require('react');
var $ = require('jquery');
var Login = require('views/profile/login');
var Register = require('views/profile/register');
var Edit = require('views/profile/edit.jsx');
var Item = require('views/profile/item.jsx');
var UserModels = require('models/user');
var pubsub = require('utils/pubsub');

module.exports = {

  login: function() {
    React.unmountComponentAtNode(document.getElementById('header-container'));
    React.unmountComponentAtNode(document.getElementById('nav-container'));
    localStorage.removeItem('user');
    var view = new Login();
    $('#app-container').empty().append(view.render().el);
  },

  logout: function() {
    React.unmountComponentAtNode(document.getElementById('header-container'));
    React.unmountComponentAtNode(document.getElementById('nav-container'));
    localStorage.removeItem('user');
    window.location.replace('/logout');
  },

  register: function() {
    React.unmountComponentAtNode(document.getElementById('header-container'));
    React.unmountComponentAtNode(document.getElementById('nav-container'));
    localStorage.removeItem('user');
    var view = new Register();
    $('#app-container').empty().append(view.render().el);
  },

  item: function(username) {
    React.render(<Item username={username} prefix={'photos'} /> , document.getElementById("app-container"));
    pubsub.trigger('appHeader:change', {title: username});
    pubsub.trigger('appHeader:showCloseSession');
  },

  tagged: function(username) {
    React.render(<Item username={username} prefix={'tagged'} /> , document.getElementById("app-container"));
    pubsub.trigger('appHeader:change', {title: username});
    pubsub.trigger('appHeader:showCloseSession');
  },

  edit: function(id) {
    React.unmountComponentAtNode(document.getElementById('nav-container'));
    React.render(<Edit userId={id} />, document.getElementById("app-container"));
  }

};
