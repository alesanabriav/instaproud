"use strict";
var app = require('express')();
var Activity = require('../models/activity');

app.route('/api/activities')
  .get(function(req, res) {

    Activity
    .find({})
    .sort({created: 'desc'})
    .limit(20)
    .skip(0)
    .populate(['from', 'photo'])
    .exec(function(err, activities) {
      if (err) return res.status(400).json(err);

      return res.json(activities);
    });

  })
  .post(function(req, res) {
    var data = req.body;
    var newActivity = new Activity(data);

    newActivity.save(function(err, activity) {
      if (err) return res.status(400).json(err);
      return res.status(201).json(activity);
    });

  });

module.exports = app;
