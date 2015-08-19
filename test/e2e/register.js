'use strict';
var _ = require('underscore');

module.exports = {
  'register user': function(client) {
    var users = ['alejandrosanab', '']
    client
    .url('localhost:3000/#register')
    .setValue('input[type=text]', )
    .setValue('input[type=password]', 'durden99')
  }
};
