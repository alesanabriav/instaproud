var gulp      = require('gulp');
var browserify = require('browserify');
var hbsfy = require("hbsfy"); // compile templates
var source = require('vinyl-source-stream'); // Use conventional text streams at the start of your gulp
var sourcemaps = require('gulp-sourcemaps'); // Write inline source maps
var debowerify = require('debowerify');
var browserifyShim = require('browserify-shim');

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
      './app/helpers/'
    ]
  };

  hbsfy.configure({
    extensions: ['hbs']
  });

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