var gulp      = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concat    = require('gulp-concat');

gulp.task('concact_css', function(){
  gulp.src([
    'css/*.scss'
  ])
  .pipe(sass())
  .pipe(concat('app.css'))
  .pipe(gulp.dest('css/dist'));
});