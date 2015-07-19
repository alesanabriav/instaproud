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

 browserify('./app/app.js', options)
  .transform(hbsfy)
    .transform(reactify)
    .transform(debowerify)
    .bundle()
    .on('error', function(err) {
      console.log(err.toString());
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('js/dist'));

});

