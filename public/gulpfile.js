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
  gulp.watch('css/*.scss', ['concact_css']);

  gulp.watch([
    'app/*/*/*',
    'app/*/*',
    'app/*',

    ], ['compile-browerserify']);

});

gulp.task('default', ['watch']);