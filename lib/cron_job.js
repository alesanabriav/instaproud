'use strict';
var CronJob = require('cron').CronJob;

module.exports = function() {
  return new CronJob('* * * * * *', function() {}, null, true, 'America/Bogota');

};
