//Dependencies
var app = require('express')();
var sharp = require('sharp');
var fs = require('fs-extra');

//Libs
var CreateName = require('../lib/createName');
var createHashtag = require('../lib/createHashtag');
var filters = require('../lib/photoFilters');
var checkAuth = require('../lib/checkAuth');

//Models
var User = require('../models/user');
var Photo = require('../models/photo');

/**
 * create random name for image and stored on uploads
 * @param  req  get request data
 * @param  res   
 * @return object
 */

app.route('/photos', checkAuth)
  .post(function(req, res) {
    var name;
    var path;
    var folder;
    var user_id = req.user._id;
    var img = new Buffer(req.body.img ,'base64');

    CreateName(user_id, function(hash) {
      name = user_id+"_"+hash + ".jpeg";
      folder = "./public/images/" + user_id;
      path = folder+"/"+ name;

      fs.mkdirs(folder, function (err) {
        if (err) throw err;

        sharp(img)
        .quality(75)
        .toFile(path, function(err) {
          if (err) throw err;
          res.json({"original": name});
        });

      });

    });
   
  })

  /**
   * Get all photos with his relationships
   * @param  req
   * @param  res
   * @return object json with all photos
   */
  .get(function(req, res) {
    commentsSkip = 0;

    Photo.find({})
    .sort({created: 'desc'})
    .populate(['owner', 'liked'])
    .populate({path: 'comments', options: { limit: 5, skip: commentsSkip, created: 'desc' }})
    .exec(function(err, photos) {
      if (err) throw err;
      //Insert nested
      Photo.populate(photos, {path: 'comments.commenter', model: 'User'}, function(err, photos) {
        if (err) throw err;
         return res.json(photos);
      })
     
    });
  });

/**
 * add to image caman filter
 * @param  req  get request data
 * @param  res   
 * @return json object
 */
app.post('/photos/filter', checkAuth, function(req, res) {

  var path = "./public"+ req.body.src;
  var imageName = req.body.src.split('/')[3];
  var filter = req.body.filter;
  var user = req.user;
  console.log(imageName);

  filters(path, imageName, filter, user, function(photo) {
    return res.json({photo: photo});
  });
  
});

/**
 * store a photo
 * @param  req
 * @param  res
 * @return json object
 */
app.post('/photos/store', checkAuth, function(req, res) {
  var src = req.body.src;

  var newPhoto = new Photo({path: src, owner: req.user._id});

  newPhoto.save(function(err, photo) {
    if (err) throw(err);
    return res.json(photo);
  });

});

app.route('/photos/:id', checkAuth)
  .get(function(req, res) {
    Photo
    .findById(req.params.id)
    .populate(['owner', 'tagged'])
    .exec(function(err, photos) {
      if (err) throw(err);
      return res.json(photos);
    });
  })

  .put(function(req, res) {
    var photoId = req.params.id;
    var query = {_id: photoId};
    var options = {new: true};
    var body = req.body;
    var hashtags = body.caption.match(/\#\w\w+\b/gm);
    var data = {caption: body.caption, hashtags: hashtags};

    Photo.findOneAndUpdate(query, data, options, function(err, photo) {
      if (err) throw(err);

      if (hashtags) {
        createHashtag.store(hashtags, photo._id);
      };
      
      return res.json(photo);
    });

  });

app.post('/photos/:id/tagged', function(req, res) {
  var id = req.params.id;
  var tagged = req.body.tagged;

  Photo.findOneAndUpdate({_id: id}, {$addToSet: {tagged: tagged} }, function(err, photo) {
     if (err) throw err;
    Photo
    .findOne({_id: photo._id})
    .populate(['owner', 'tagged'])
    .exec(function(err, photoUpdated) {
      if (err) throw err;
      return res.json(photoUpdated);
    });
    
  });
});


module.exports = app;
