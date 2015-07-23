'use strict';

var $ = require('jquery');
var Login = require('views/profile/login');
var Register = require('views/profile/register');
var Edit = require('views/profile/edit');
// var Item = require('views/profile/item');
var Item = require('views/profile/item.jsx');
var UserModels = require('models/user');
var pubsub = require('utils/pubsub');
var loadImages = require('utils/loadImages');
var urls = require('config/urls');
var React = require('react');

module.exports = {

  initialize: function() {

  },

  login: function() {
    var view = new Login();
    $('#app-container').empty().append(view.render().el);
  },

  logout: function() {
    localStorage.removeItem('user');
    window.location.replace('/logout');
  },

  register: function() {
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

    // $.get(urls.baseUrl + '/api/users/' + username + '/photos')
    // .then(function(model) {
    //   var view = new Item({model: model});
    //   var grid = new Grid({collection: model});
    //   loadImages();
    // });
  },

  tagged: function(username) {
    React.render(<Item username={username} prefix={'tagged'} /> , document.getElementById("app-container"));
    pubsub.trigger('appHeader:change', {title: username});
    pubsub.trigger('appHeader:showCloseSession');
    // var view = new Tagged();

    // $.get(urls.baseUrl + '/api/users/' + username + '/tagged')
    // .then(function(model) {
    //   $('#app-container').empty().append(view.render(model).el);
    //   loadImages();
    // });
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
