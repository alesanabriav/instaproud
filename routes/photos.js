//Dependencies
var app = require('express')();
var Jimp = require("jimp");
var server = require('http').Server(app);
var async = require('async');

var rename = require('../helpers/rename');
var filters = require('../lib/photoFilters');

/**
 * create random name for image and stored on uploads
 * @param  req  get request data
 * @param  res   
 * @return object
 */
app.post('/photos', function(req, res, next) {
  var img = new Buffer(req.body.img ,'base64');
  var hash = rename("1nstaPr0ud" + Math.random() );
  var name = hash + ".jpg";
  var path = "./public/uploads/" + name;
  
  new Jimp(img, function (err, image) {
    if (err) throw err;

    image.write(path);
    res.json({"original": name});
  });

});

/**
 * add to image caman filter
 * @param  req  get request data
 * @param  res   
 * @return object
 */
app.post('/photos/filter', function(req, res, next) {

  var src = "./public/"+req.body.src;
  var filter = req.body.filter;
  filters(src, filter, function(photo) {
    return res.json({photo: photo});
  });
  
  
});

module.exports = app;
