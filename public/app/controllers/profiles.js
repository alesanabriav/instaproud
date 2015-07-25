'use strict';
var React = require('react');
var $ = require('jquery');
var Login = require('views/profile/login.jsx');
var Register = require('views/profile/register.jsx');
var Edit = require('views/profile/edit.jsx');
var Item = require('views/profile/item.jsx');
var pubsub = require('utils/pubsub');

module.exports = {

  login: function() {
    React.unmountComponentAtNode(document.getElementById('header-container'));
    React.unmountComponentAtNode(document.getElementById('nav-container'));
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
    React.render(<Login />, document.getElementById('app-container'));

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
    React.render(<Register />, document.getElementById('app-container'));
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
