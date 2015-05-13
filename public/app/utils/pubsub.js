var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = {};
_.extend(pubsub, Backbone.Events);

module.exports = pubsub;