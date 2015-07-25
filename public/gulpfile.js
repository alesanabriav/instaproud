'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

gulp.task('watch', ['sass', 'browserify'], function() {
  gulp.watch([
    'css/*.scss',
    'css/*/*.scss'
    ], ['sass']);

  gulp.watch([
    'app/*/*/*.*',
    'app/*/*.*',
    'app/*.*'
    ], ['browserify']);
});

gulp.task('default', ['watch']);
