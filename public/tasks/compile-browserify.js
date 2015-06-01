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
      './app/templates/'
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
  .pipe(source('app.js'))
  .pipe(gulp.dest('js/dist'));
});