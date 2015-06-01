//Dependencies
var app = require('express')();
var sharp = require('sharp');

//Models
var User = require('../models/user');
var Photo = require('../models/photo');

//Libs
var rename = require('../lib/createName');

app.route('/users')

  .post(function(req, res) {

    var data = req.body;

    var newUser = new User(data);

    newUser.save( function(err, user) {
      if (err) throw err;

      req.login(user, function(err) {
        if (err) { return next(err); }
        return res.json(user);
      });

    });
  });

app.route('/users/:id')

  .get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if(err) res.status(400).json(err);
      res.json(user);
    });
  })

  .put(function(req, res) {
    var data = req.body;
    var id = req.params.id;

    User.update({_id: id}, data, { runValidators: true }, function(err, user) {
      if(err) res.status(400).json(err);
      return res.json(user);
    });
  });

app.post('/users/:id/image', function(req, res) {
  var userId = req.user._id;
  var img = req.files.profile_image.path;
  var name;
  var path;

  rename(userId, function(hash) {
    
    name = userId+"_"+hash + "_profile.jpeg";
    path = "./public/images/" + name;

    sharp("./"+img)
    .resize(300)
    .quality(70)
    .toFile(path, function(err) {
      if (err) throw err;

      User.findOneAndUpdate({_id: userId},{profile_image: name}, function(err, user) {
          return res.json(user);
      });

    });
  });
});

app.get('/users/search/:query', function(req, res) {
  var query = req.params.query;

  User.find({$or: [{username: new RegExp(query, 'i')},  {name: new RegExp(query, 'i')}]}, function(err, users) {
    if (err) throw err;
    return res.json(users);
  });
});

app.get('/users/:id/photos', function(req, res) {
  var id = req.params.id;

  User.findOne({_id: id}, function(err, user) {
    if (err) throw err;
    Photo.find({owner: user._id}, function(err, photos) {
      return res.json(photos);
    });
  });
})

module.exports = app;
