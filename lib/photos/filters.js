"use strict";
var Caman = require('caman').Caman;
var rename = require('../createName');
var fs = require('fs-extra');

var listFilters = {

  'concentrate': function(context) {
    return context.concentrate();
  },

  'crossProcess': function(context) {
    return context.crossProcess();
  },

  'herMajesty': function(context) {
    return context.herMajesty();
  },

  'jarques': function(context) {
    return context.jarques();
  },

  'love': function(context) {
    return context.love();
  },

  'nostalgia': function(context) {
    return context.nostalgia();
  },

  'pinhole': function(context) {
    return context.pinhole();
  },

  'sunrise': function(context) {
    return context.sunrise();
  },

  'vintage': function(context) {
    return context.vintage();
  },

};

/**
 * If image not exist create image with filter
 * @param  {String} path to image on disk
 * @param  {String} filter name of filter to apply
 * @param  {Function} next callback
 * @return {Function} next callback
 */
//
 module.exports = function addPhotoFilter(imageOriginal, imageName, filter, user, next) {
  var userId = user._id;
  var pathImages = "./public/images/"+userId+"/";
  var name = imageName.split('.')[0] + "_" + filter + ".jpeg";

  fs.open(pathImages + name, 'r', function(err) {
    if (err) {

      Caman(imageOriginal, function() {
        listFilters[filter](this);
        this.render(function() {
          this.save(pathImages + name);
          next(name);
        });
      });

    } else {
      next(name);
    }
  });
}
