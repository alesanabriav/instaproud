'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var debowerify = require('debowerify');
var reactify = require('reactify');
var browserifyCss = require('browserify-css');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

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

 browserify('./app/app.js', options)
    .transform(reactify)
    .transform(debowerify)
    .transform(browserifyCss, {global: true})
    .bundle()
    .on('error', function(err) {
      console.log(err.toString());
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('js/dist'));
});
