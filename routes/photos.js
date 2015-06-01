//Dependencies
var app = require('express')();
var sharp = require('sharp');
var async = require('async');
var fs = require('fs-extra');

//Libs
var rename = require('../lib/createName');
var filters = require('../lib/photoFilters');
var checkAuth = require('../lib/checkAuth');
var createHashtag = require('../lib/createHashtag');

//Models
var User = require('../models/user');
var Photo = require('../models/photo');

/**
 * create random name for image and stored on uploads
 * @param  req  get request data
 * @param  res   
 * @return object
 */
app.post('/photos', checkAuth, function(req, res) {
  var name;
  var path;
  var folder;
  var user_id = req.user._id;
  var img = new Buffer(req.body.img ,'base64');

  rename(user_id, function(hash) {
    name = user_id+"_"+hash + ".jpeg";
    folder = "./public/images/" + user_id;
    path = folder+"/"+ name;

    fs.mkdirs(folder, function (err) {
      if (err) throw err;

      sharp(img)
      .quality(75)
      .toFile(path, function(err) {
        if (err) throw err;
        res.json({"original": path});
      });

    });

  });
 
});

app.get('/photos', checkAuth, function(req, res) {
  Photo.find({}).sort({created: 'desc'}).populate('owner').exec(function(err, photos) {
    if (err) throw(err);
    return res.json(photos);
  });
});

/**
 * add to image caman filter
 * @param  req  get request data
 * @param  res   
 * @return object
 */
app.post('/photos/filter', checkAuth, function(req, res) {

  var src = "./public/"+ req.body.src;
  var filter = req.body.filter;
  var user = req.user;

  filters(src, filter, user, function(photo) {
    return res.json({photo: photo});
  });
  
});

app.post('/photos/store', checkAuth, function(req, res) {
  var src = req.body.src;

  var newPhoto = new Photo({path: src, owner: req.user._id});

  newPhoto.save(function(err, photo) {
    if (err) throw(err);
    return res.json(photo);
  });

});

app.route('/photos/:id')
.get(checkAuth, function(req, res) {
  Photo.findById(req.params.id).populate(['owner', 'tagged']).exec(function(err, photos) {
    if (err) throw(err);
    return res.json(photos);
  });
})

.put(checkAuth, function(req, res) {
  var photoId = req.params.id;
  var query = {_id: photoId};
  var options = {new: true};
  var body = req.body;
  var hashtags = body.caption.match(/\#\w\w+\b/gm);
  var data = {caption: body.caption, hashtags: hashtags};

  Photo.findOneAndUpdate(query, data, options, function(err, photo) {
    if (err) throw(err);

    if (hashtags) {
      createHashtag.store(hashtags, photo);
    };
    
    return res.json(photo);
  });

});

app.post('/photos/:id/like', function() {
   var id = req.params.id;
  var userId = req.body.tagged;

  Photo.findOne({_id: id}, function(err, photo) {
    if (err) throw err;

    photo.update({$addToSet: {tagged: userId} }, function(err) {
      if (err) throw err;

      User.findOne({_id: userId}, function(err, o) {
        if (err) throw err;

        return res.json(o);
      });

    });
  });
});


app.post('/photos/:id/liked', function(req, res) {
  var id = req.params.id;
  var userId = req.body.liked;

  Photo.findOneAndUpdate({_id: id}, {$addToSet: {liked: userId} }, function(err, user) {
    return res.json(user);
  });
});

app.get('/photos/hashtag/:hashtag', function(req, res) {
  var hashtag = "#"+req.params.hashtag;

  Photo.find({hashtags: hashtag}, function(err, hash) {
    if (err) throw(err);

    return res.json(hash);
  })

});

module.exports = app;
