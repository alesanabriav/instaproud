'use strict';
var Activity = require(__base + 'models/activity');
var emitter = require(__base + 'lib/emitter');

module.exports = function storeActivity(io, next) {
  emitter.on('activity:store', function(data) {
    var newActivity = new Activity(data);

    newActivity.save(function(err, activity) {
      if (err) return next(err);

      Activity
      .findOne({_id: activity._id})
      .populate('from')
      .populate('photo')
      .exec(function(err, activityPopulate) {
        io.of('/activities').emit('new', activityPopulate);
      });
    });
  });
};
