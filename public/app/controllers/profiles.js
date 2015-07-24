'use strict';
var React = require('react');
var $ = require('jquery');
var Login = require('views/profile/login');
var Register = require('views/profile/register');
var Edit = require('views/profile/edit');
var Item = require('views/profile/item.jsx');
var UserModels = require('models/user');
var pubsub = require('utils/pubsub');

module.exports = {

  login: function() {
    localStorage.removeItem('user');
    var view = new Login();
    $('#app-container').empty().append(view.render().el);
  },

  logout: function() {
    localStorage.removeItem('user');
    window.location.replace('/logout');
  },

  register: function() {
    localStorage.removeItem('user');
    var view = new Register();
    $('#app-container').empty().append(view.render().el);
  },

  item: function(username) {
    if (!username || username === '') {
      username = JSON.parse( localStorage.getItem('user') ).username;
    }

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
    var data = {title: 'Editar Perfil'};

    pubsub.trigger('appHeader:render', data);

    pubsub.trigger('appHeader:showCheck');

    pubsub.trigger('footerNav:remove');

    var model = new UserModels.user({id: id});
    new Edit({model: model});
    model.fetch();
  }

};
