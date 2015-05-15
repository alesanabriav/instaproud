var express = require('express');
var app = express();
var Caman = require('caman').Caman;
var Jimp = require("jimp");
var fs = require('fs');
var crypto = require('crypto');
var base64image = require('base64-image');

// generate name for image
var rename = function (src) {

  var random_string = src + Date.now() + Math.random();
  return crypto.createHash('md5').update(random_string).digest('hex');
};

app.route('/photos')

.post(function(req, res, next) {
  console.log(req.body.img );
  var img = new Buffer(req.body.img ,'base64');

  var crop = new Jimp(img, function (err, image) {
    if (err) throw err;

    image.quality(80)
    .write("buff.png");
  });

  res.json({"error": "err"});
  
  // var _files = req.files;
  // var photo = _files.photo;
  // var path = photo.path;
  // var hash = rename(path);
  // var width;
  // var height;

  // var crop = new Jimp(path, function (err) {
  //   if (err) throw err;
  //   //edit image
    
  //   if (this.bitmap.width >= 1500) {
  //     width = (this.bitmap.width/3);
  //     height = (this.bitmap.height/3);
  //   } else if(this.bitmap.width >= 1000) {
  //     width = (this.bitmap.width/2);
  //     height = (this.bitmap.height/2);
  //   } else {
  //     width = this.bitmap.width;
  //     height = this.bitmap.height;
  //   };

  //   this
  //   .resize(width, height)
  //   .write('./public/uploads/'+hash+'.jpg');

  //   //Delete file
  //   fs.unlinkSync(path);
  //   return res.send(hash+'.jpg');
  // });

})

.get(function(req, res, next){
  console.log(req);

  // var body = req.query;
  // var scaleStr = body.scale.slice(0, 5);
  // //convert value to float
  // var scale = parseFloat(scaleStr);
  // var x = parseInt(body.x);
  // var y = parseInt(body.y);
  // var src = body.src;
  // var path = "./public" + src;
  // var hash = rename(src);

  // var crop = new Jimp(path, function (err) {
  //   if (err) throw err;

  //   //edit image
  //   this.quality(80)
  //   .scale(scale)
  //   .crop(x, y, 500, 500)
  //   .write('./public/images/'+hash+'.jpg');

  //   //Delete file
  //   fs.unlinkSync(path);

  //   // add filter jarques to image
  //   var jarques = Caman("./public/images/"+hash+".jpg", function () {
  //     this.jarques();

  //     this.render(function () {
  //       this.save("./public/images/"+hash+"_jarques.jpg");
  //     });
  //   });

  //   // add filter pinhole to image
  //   var pinhole =  Caman("./public/images/"+hash+".jpg", function () {
      
  //     this.pinhole();

  //     this.render(function () {
  //       this.save("./public/images/"+hash+"_pinhole.jpg");
  //     });
  //   });

  //   // add filter hemingway to image
  //   var hemingway = Caman("./public/images/"+hash+".jpg", function () {
  //     this.hemingway();

  //     this.render(function () {
  //       this.save("./public/images/"+hash+"_hemingway.jpg");
  //     });
  //   });

  //   // add filter sunrise to image
  //   var sunrise = Caman("./public/images/"+hash+".jpg", function () {

  //     this.sunrise();

  //     this.render(function () {
  //       this.save("./public/images/"+hash+"_sunrise.jpg");
  //     });
  //   });

  //   return res.json({

  //     "filters": [
  //     {
  //         "image": hash + ".jpg",
  //         "filter_name": "Original"
  //       },
  //       {
  //         "image": hash+"_hemingway.jpg",
  //         "filter_name": "hemingway"
  //       },

  //       {
  //         "image": hash+"_sunrise.jpg",
  //         "filter_name": "sunrise"
  //       },
  //       {
  //         "image": hash+"_pinhole.jpg",
  //         "filter_name": "pinhole"
  //       },

  //       {
  //         "image": hash+"_jarques.jpg",
  //         "filter_name": "jarques"
  //       },

        
  //     ],

  //     "original": hash + ".jpg"

  //   });

  // });
});

// render image with filters and return object
app.route('/photos/filters')
.post(function(err, res, next) {

});

// upload photo and return path

// crop and apply 4 filters and return object


module.exports = app;
