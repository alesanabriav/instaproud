var express = require('express');
var app = express();
var Caman = require('caman').Caman;
var Jimp = require("jimp");
var fs = require('fs');
var crypto = require('crypto');
var base64image = require('base64-image');
var async = require('async');

// generate name for image
var rename = function (src) {
  var random_string = src + Date.now() + Math.random();
  return crypto.createHash('md5').update(random_string).digest('hex');
};

app.route('/photos')

.post(function(req, res, next) {

  var img = new Buffer(req.body.img ,'base64');
  var hash = rename("1nstaPr0ud" + Math.random() );
  var path = "./public/uploads/"+ hash +".jpg";

  async.waterfall([

    function downQuality(callback) {
      new Jimp(img, function (err, image) {
        if (err) throw err;

        image.quality(80)
        .write(path);
        callback();
      });
    },

    function pinhole(callback) {
      Caman(path, function () {
        this.pinhole()
        .contrast(10);

        this.render(function () {
          this.save("./public/images/"+hash+"_pinhole.jpg");
          callback();
        });
      });
    },

    function jarques(callback) {
      Caman(path, function () {
        this.jarques()
        .contrast(10);

        this.render(function () {
          this.save("./public/images/"+hash+"_jarques.jpg");
          callback();
        });
      });
    },

    function sunrise(callback) {
      Caman(path, function () {
        this.sunrise()
        .contrast(10);

        this.render(function () {
          this.save("./public/images/"+hash+"_sunrise.jpg");
          callback();
        });
      });
    },

    function hemingway(callback) {
      Caman(path, function () {
        this.hemingway()
        .contrast(10);

        this.render(function () {
          this.save("./public/images/"+hash+"_hemingway.jpg");
          callback();
        });
      });
    }
  ],

  // optional callback 
  function(err, results){
    if (err) {
      console.log(err);
    };
  });

  res.json({"error": "err"});
});

module.exports = app;
