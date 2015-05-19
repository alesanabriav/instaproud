var gulp      = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:3000"
    });
});

gulp.task('watch', ['concact_css','compile-browerserify', 'browser-sync'], function() {
  gulp.watch('css/*.scss', ['concact_css', reload]);

  gulp.watch([
    'app/*/*/*.js',
    'app/*/*.js',
    'app/*.js',
    ], ['compile-browerserify', reload]);

});

gulp.task('default', ['watch']);