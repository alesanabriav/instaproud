'use strict';
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('concact_dependencies_css', function() {
  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/ionicons/css/ionicons.min.css',
    'bower_components/cropper/dist/cropper.min.css',
    'bower_components/selectize/dist/css/selectize.bootstrap3.css',
    'bower_components/animate.css/animate.min.css',
    'node_modules/alertifyjs/build/css/alertify.css',
    'node_modules/nprogress/nprogress.css',
    'node_modules/semantic-ui-dropdown/dropdown.css',
    'node_modules/semantic-ui-transition/transition.css'
  ])
  .pipe(concat('dependencies.css'))
  .pipe(gulp.dest('css/dist'));
});
