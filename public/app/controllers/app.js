var AppNavView = require('views/app_nav.js');
var AppHeaderView = require('views/app_header.js');

module.exports = {
  initialize: function() {
    new AppNavView();
    new AppHeaderView();
  }

 }
