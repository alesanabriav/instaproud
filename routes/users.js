//Dependencies
var app = require('express')();
var sharp = require('sharp');

var User = require('../models/user');
var Photo = require('../models/photo');

var rename = require('../lib/createName');

app.route('/users')

  .post(function(req, res, next) {
    var data = req.body;
    var newUser = new User(data);
    console.log(data);
    newUser.save( function(err, user) {
      if (err) {
        if (err.errors) {
          return res.status(400).json(err.errors);
        };
        return res.status(400).json({ user: {"message": "El usuario ya existe"} });
      }

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

      User.findOne({_id: id}, function(err, userUpadated){
        if (err) throw err;
        return res.json(userUpadated);
      });

    });
  });

app.post('/users/:id/image', function(req, res, next) {
  var userId = req.user._id;
  var img = req.files.profile_image.path;
  var name;
  var path;

  rename(userId, function(err, hash) {
    if (err) return next(err);

    name = userId+"_"+hash + "_profile.jpeg";
    path = "./public/images/" + name;

    sharp("./"+img)
    .resize(300)
    .quality(70)
    .toFile(path, function(err) {
      if (err) throw err;

      User.findOneAndUpdate({_id: userId},{profile_image: name}, function(err, user) {
        if (err) throw err;

        User.findOne({_id: user.id}, function(err, userUpadated){
          if (err) throw err;
          return res.json(userUpadated);
        })

      });

    });
  });
});

app.get('/users/search/:query', function(req, res) {
  var query = req.params.query;

  User.find({$or: [
    {username: new RegExp(query, 'i')},
    {name: new RegExp(query, 'i')}
  ]})
  .exec(function(err, users) {
    if (err) throw err;
    return res.json(users);
  });
});

app.get('/api/users/:username/photos', function(req, res) {
  var username = req.params.username;
  var data;

  User.findOne({username: username})
  .exec(function(err, user) {
    if (err) return res.status(400).json({message: "No existe"});
    if (user) {
      Photo.find({owner: user._id})
      .sort({created: 'desc'})
      .limit(20)
      .skip(0)
      .exec(function(err, photos) {
        if (err) throw err;
        data = {user: user, photos: photos};
        return res.json(data);
      });

    };

  });
});

app.get('/api/users/:username/tagged', function(req, res) {
  var username = req.params.username;
  var data;

  User.findOne({username: username}, function(err, user) {
    if (err) return res.status(400).json({message: "No existe"});
    if (user) {
      Photo.find({tagged: user._id}, function(err, photos) {
        if (err) throw err;
        data = {user: user, photos: photos};
        return res.json(data);
      });

    };

  });
});

app.post('/users/me/logged', function(req, res){
  return res.json(req.user);
});

module.exports = app;
