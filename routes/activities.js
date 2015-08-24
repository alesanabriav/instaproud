'use strict';
var app = require('express')();
var Activity = require('../models/activity');

app.route('/api/activities')
  .get(function(req, res) {
     var activitySkip = parseInt(req.query.activitySkip) || 0;

    Activity
    .find()
    .sort({created: 'desc'})
    .limit(20)
    .skip(activitySkip)
    .populate(['from', 'photo'])
    .exec(function(err, activities) {
      if (err) return res.status(400).json(err);

      return res.json(activities);
    });

  })

  .post(function(req, res) {
    var body = req.body;
    var user = req.user;
    var data = {from: user._id, text: body.text, photo: body.photo};
    var newActivity = new Activity(data);
    newActivity.save(function(err, activity) {
      if (err) return res.status(400).json(err);
      return res.status(201).json(activity);
    });

  })
  .delete(function(req, res) {
    return res.status(200).json(req.body);
  });

module.exports = app;
