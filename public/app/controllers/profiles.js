"use strict";
var Edit = require('views/profile/edit');
var Item = require('views/profile/item');
var Tagged = require('views/profile/tagged');
var UserModels = require('models/user');
var pubsub = require('utils/pubsub');

module.exports = {

  initialize: function() {

  },

  item: function(username) {
    var view = new Item();
    view.pull(username);
  },

  tagged: function(username) {
    var view = new Tagged();
    view.pull(username);
  },

  edit: function(id) {
    var data = {title: "Editar Perfil", bgColor: "444"};

    pubsub.trigger('appHeader:render', data);

    pubsub.trigger('appHeader:showNext');
    pubsub.trigger('footerNav:remove');
    var model = new UserModels.user({id: id});
    new Edit({model: model});
    model.fetch();
  }

}