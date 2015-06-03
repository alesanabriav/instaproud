var Caman = require('caman').Caman;
var rename = require('./createName');
var fs = require('fs-extra');

var filters = {

  'pinhole': function(context) {
    return context.pinhole();
  },

  'hemingway': function(context) {
    return context.hemingway();
  },

  'jarques': function(context) {
    return context.jarques();
  },

  'sunrise': function(context) {
    return context.sunrise();
  },

  'nostalgia': function(context) {
    return context.nostalgia();
  },

  'concentrate': function(context) {
    return context.concentrate();
  },

  'sinCity': function(context) {
    return context.sinCity();
  },

};

/**
 * If image not exist create image with filter
 * @param  {[type]} path to image on disk
 * @param  {[type]} filter name of filter to apply
 * @param  {[type]} cb callback
 * @return callback
 */
 module.exports = function photoFilters(imageOriginal, imageName, filter, user, cb) {
  var userId = user._id;
  var pathImages = "./public/images/"+userId+"/";
  var name = imageName.split('.')[0] + "_" + filter + ".jpeg";

  fs.open(pathImages + name, 'r', function(err) {
    if (err) {

      Caman(imageOriginal, function() {
        filters[filter](this);
        this.render(function() {
          this.save(pathImages + name);
          cb(name);
        });
      });

    } else {
      cb(name);
    }
  });
}
