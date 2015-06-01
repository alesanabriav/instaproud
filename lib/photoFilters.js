var Caman = require('caman').Caman;
var rename = require('./createName');

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
 * create random name and according to 
 * name filter execute the Caman function
 * @param  {[type]} path to image on disk
 * @param  {[type]} filter name of filter to apply
 * @param  {[type]} cb callback
 * @return callback
 */
 module.exports = function photoFilters(path, filter, user, cb) {
  var name;
  var strUnique;
  var pathImages = "./public/images/";

  if(user) {
    strUnique = user._id;
  } else {
    strUnique = "1nstaPr0ud";
  }

  rename(strUnique, function(hash) {

    name = strUnique + "_" + hash + "_" + filter + ".jpeg";

    Caman(path, function() {

      filters[filter](this);

      this.render(function() {
        this.save(pathImages + name);
        cb(name);
      });

    });
  });

}
