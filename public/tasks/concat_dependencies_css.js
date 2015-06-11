var gulp      = require('gulp');
var minifyCss = require('gulp-minify-css');
var concat    = require('gulp-concat');

gulp.task('concact_dependencies_css', function(){
  gulp.src([
    'css/bootstrap.min.css',
    'bower_components/font-awesome/css/font-awesome.min.css',
    'bower_components/cropper/dist/cropper.css',
    'bower_components/selectize/dist/css/selectize.bootstrap3.css',
    'bower_components/animate.css/animate.min.css',
    'node_modules/alertifyjs/build/css/alertify.css'
  ])
  .pipe(concat('dependencies.css'))
  .pipe(gulp.dest('css/dist'));
});