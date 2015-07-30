'use strict';
var _ = require('underscore');
var Backbone = require('backbone');

var pubsub = {};
module.exports = _.extend(pubsub, Backbone.Events);
