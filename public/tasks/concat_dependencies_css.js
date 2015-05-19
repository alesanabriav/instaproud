var gulp      = require('gulp');
var minifyCss = require('gulp-minify-css');
var concat    = require('gulp-concat');

gulp.task('concact_dependencies_css', function(){
  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/font-awesome/css/font-awesome.min.css',
    'bower_components/cropper/dist/cropper.css'
  ])
  .pipe(concat('dependencies.css'))
  .pipe(gulp.dest('css/dist'));
});