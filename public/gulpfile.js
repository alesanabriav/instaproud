'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

gulp.task('watch', ['concact_css', 'browserify'], function() {
  gulp.watch([
    'css/*.scss',
    'css/*/*.scss'
    ], ['concact_css']);

  gulp.watch([
    'app/*/*/*.*',
    'app/*/*.*',
    'app/*.*'
    ], ['browserify']);
});

gulp.task('default', ['watch']);
