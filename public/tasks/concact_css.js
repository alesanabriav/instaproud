var gulp      = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concat    = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
  gulp.src([
    'css/*.scss'
  ])
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(concat('app.css'))
  .on('error', function(err) {
    console.log(err.toString());
  })
  .pipe(gulp.dest('css/dist'));
});