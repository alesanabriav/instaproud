'use strict';
var app = require('express')();
var User = require(__base + 'models/user');
var photosByOwner = require(__base + 'lib/photos/by_owner');
var photosByTagged = require(__base + 'lib/photos/by_tagged');
var generateHash = require(__base + 'lib/createName');
var photosCount = require(__base + 'lib/photos/count_by_owner');
var photosTaggedCount = require(__base + 'lib/photos/count_tagged_by_owner');
var processProfileImage = require(__base + 'lib/users/process_profile_image');
var addProfileImage = require(__base + 'lib/users/add_profile_image');
var uploadToS3 = require(__base + 'lib/photos/upload_to_S3');
var mailVerification = require(__base + 'mails/verification');

app.post('/users', function(req, res, next) {
  var data = req.body;
  var newUser = new User(data);

  newUser.save(function(err, user) {
    if (err) return res.status(400).json(err.errors.password);
    req.login(user, function(err) {
      if (err) return next(err);
      mailVerification(user, function(err, status) {
        if(err) return console.log(err);
        return res.status(201).json(user);
      });
    });
  });
});

app.get('/users/:id/validation/', function(req, res) {
  var id = req.params.id;
  var salt = req.query.code;
  User.findOne({_id: id, salt: salt}).exec(function(err, user) {
    if(err) return res.status(400).json(err);
    if (user) {
      user
        .update({_id: id}, {$set: {status: 'active'}})
        .exec(function(err) {
        if(err) return err;
         return res.sendfile('./views/activated.html');
      });
    } else {
      return res.status(400).json('error');
    }
  });
});

app.get('/api/users/:username/profile', function(req, res) {
  var username = req.params.username;
  var data = {};

  User.findOne({username: username})
  .exec(function(err, user) {
    if (err) return res.status(400).json({message: 'No existe'});
    photosCount(user.id, function(err, count) {
      if (err) return res.status(400).json({message: err});
      data = {user: user, photosCount: count};
      return res.json(data);
    });
  });
});

app.route('/api/users/:id')
  .get(function(req, res) {
    User.findById(req.params.id, 'username name email profile_image role birthday gender area bio', function(err, user) {
      if(err) res.status(400).json(err);
      res.json(user);
    });
  })
  .put(function(req, res) {
    var data = req.body;
    var id = req.params.id;

    User.update({_id: id}, data, { runValidators: true }, function(err, user) {
      if(err) return res.status(400).json(err);

      User.findOne({_id: id}, function(err, userUpadated){
        if (err) return next(err);
        return res.json(userUpadated);
      });

    });
  });

app.post('/users/:id/image', function(req, res, next) {
  var userId = req.user._id;
  var image = req.files.profile_image.path;
  var time = Date.now();
  var name;
  var folder;
  var path;

  generateHash(userId, function(err, hash) {
    if (err) return next(err);

    name = hash + '_' + time + '_profile.jpeg';
    folder = './public/images/' + userId;
    path = folder + '/' + name;

    //processImage
    processProfileImage(image, folder, path, function(err) {
      if (err) return next(err);

      //add Profile image
      addProfileImage(userId, name, function(err, user) {
        if (err) return next(err);

        //find one
        User.findOne({_id: user.id}, function(err, userUpadated) {
          if (err) return next(err);

          //upload to s3
          uploadToS3(name, req.user._id, function(err, data) {
            if (err) return next(err);

            return res.json(userUpadated);
          });
        });
      });
    });
  });
});

app.get('/users/search/:query', function(req, res) {
  var query = req.params.query;

  User.find({$or: [
    {name: new RegExp(query, 'i')},
    {username: new RegExp(query, 'i')}
  ]}, 'name username')
  .exec(function(err, users) {
    if (err) throw err;
    return res.json(users);
  });
});

app.get('/api/users/:username/photos', function(req, res, next) {
  var username = req.params.username;
  var photosSkip = parseInt(req.query.photosSkip);

  User.findOne({username: username})
  .exec(function(err, user) {
    if (err) return res.status(400).json({message: 'No existe'});

    photosByOwner(user, photosSkip, function(err, data) {
      if (err) return next(err);
      return res.json(data);
    });

  });
});

app.get('/api/users/:username/tagged', function(req, res, next) {
  var username = req.params.username;
  var photosSkip = parseInt(req.query.photosSkip) || 0;
  var data;

  User.findOne({username: username}, function(err, user) {
    if (err) return res.status(400).json({message: 'No existe'});

    photosByTagged(user, photosSkip, function(err, data) {
      if (err) return next(err);
      return res.json(data.photos);
    });
  });

});

app.get('/api/users/me/logged', function(req, res){
  return res.json(req.user);
});

app.post('/api/users/:id/password', function(req, res) {
    var body = req.body;
    var id = req.params.id;

    if (body.password === '') {
      return res.status(400).json({message: 'debe ingresar la contraseña actual'});
    }

   if (body.newPassword === '') {
      return res.status(400).json({message: 'debe ingresar una nueva contraseña'});
    }

    if (body.rePassword === '') {
      return res.status(400).json({message: 'debe verificar la contraseña'});
    }

    if (body.newPassword !== body.rePassword) {
      return res.status(400).json({message: 'no coincide'});
    }

    User.findOne({_id: id}, function(err, user) {
      if(err) res.status(400).json({message: 'no existe'});
      if(user.validPassword(body.password)) {
        user.password = body.newPassword;
        user.save(function(err) {
          if(err) return res.status(400).json(err.errors.password);
          return res.json({status: 'ok'});
        });
      } else {
        return res.status(400).json({message: 'contraseña actual no valida'});
      }
    });


});

module.exports = app;
