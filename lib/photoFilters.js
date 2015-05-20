var Caman = require('caman').Caman;
var rename = require('../helpers/rename');

/**
 * create random name and according to 
 * name filter execute the Caman function
 * @param  {[type]} path to image on disk
 * @param  {[type]} filter name of filter to apply
 * @param  {[type]} cb callback
 * @return callback
 */
module.exports = function photoFilters(path, filter, cb) {

  var pathImages = "./public/images/";
  var hash = rename("1nstaPr0ud" + Math.random() );
  var name = hash +"_"+ filter + ".jpg";


  var filters = {

    /**
     * apply filter to image and return his name
     * @param  {Function} cb callback
     * @return callback
     */
    'pinhole': function(cb) {
      var f = Caman(path, function () {
        this.pinhole();

        this.render(function () {
          this.save(pathImages + name);
          cb(name);
        });

      });

    },

    'hemingway': function(cb) {
      Caman(path, function () {
        this.hemingway();

        this.render(function () {
          this.save(pathImages + name);
          cb(name);
        });
      });
    },

    'jarques': function(cb) {
      Caman(path, function () {
        this.jarques();

        this.render(function () {
          this.save(pathImages + name);
          cb(name);
        });
      });

    },

     'sunrise': function(cb){
      Caman(path, function () {
        this.sunrise();

        this.render(function () {
          this.save(pathImages + name);
          cb(name);
        });
      });
    },

  }

  filters[filter](function(res){
    if (typeof cb === "function") {
      cb(res);
    }
  });

}
