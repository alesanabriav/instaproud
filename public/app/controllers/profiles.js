//views
var edit = require('views/profile/edit');
var item = require('views/profile/item');

//models
var UserModels = require('models/user');

//Utils
var pubsub = require('utils/pubsub');

module.exports = {

  initialize: function() {

  },

  item: function(username) {
    var view = new item();
    view.pull(username);
  },

  edit: function(id) {
    var data = {title: "Editar Perfil", bgColor: "444"};

    pubsub.trigger('appHeader:render', data);
    
    pubsub.trigger('appHeader:showNext');
    pubsub.trigger('footerNav:remove');
    var model = new UserModels.user({id: id});
    new edit({model: model});
    model.fetch();
  }
  
}