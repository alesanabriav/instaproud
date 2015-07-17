'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var hbsfy = require('hbsfy');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var debowerify = require('debowerify');
var reactify = require('reactify');
var browserifyShim = require('browserify-shim');

// compile browersify app
gulp.task('browserify', function () {
  var options = {
    insertGlobals: true,
    cache: {},
    packageCache: {},
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

  var b = browserify('./app/app.js', options);
  var w = watchify(b);

  var rebundle = function() {
    w
    .transform(hbsfy)
    .transform(reactify)
    .transform(debowerify)
    .transform(browserifyShim)
    .bundle()
    .on('error', function(err) {
      console.log(err.toString());
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('js/dist'));
  };

  w.on('update', rebundle);
  return rebundle();
});

