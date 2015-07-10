var gulp      = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var hbsfy = require("hbsfy"); // compile templates
var source = require('vinyl-source-stream'); // Use conventional text streams
var sourcemaps = require('gulp-sourcemaps'); // Write inline source maps
var debowerify = require('debowerify'); // use bower components like npm
var browserifyShim = require('browserify-shim');
var fs = require('fs-extra');

// compile browersify app
gulp.task('compile-browerserify', function () {
  var options = {
    debug: true,
    insertGlobals: true,
    paths: [
      './node_modules',
      './app/',
      './app/utils/',
      './app/controllers/',
      './app/models/',
      './app/views/',
      './app/templates/',
      './app/helpers/',
      './app/config/'
    ]
  };

  hbsfy.configure({
    extensions: ['hbs']
  });

  fs.remove('./js/dist/app.js', function(err) {
    if (err) return console.log(err);

    browserify('./app/app.js', options)
    .transform(hbsfy)
    .transform(debowerify)
    .transform(browserifyShim)
    .bundle()
    .on('error', function(err) {
      console.log(err.toString());
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('js/dist'));
  });
});
