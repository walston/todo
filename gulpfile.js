var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var casper = require('gulp-casperjs');

gulp.task('default', function() {
  nodemon({ script: 'app.js '})
  .on('start', ['test']);
});

gulp.task('serverTest', function() {
  return gulp.src('app.spec.js').pipe(mocha());
});

gulp.task('clientTest', function() {
  return gulp.src('casper.test.js').pipe(casper());
});

gulp.task('test', ['clientTest', 'serverTest']);

gulp.task('development', function() {
  nodemon({ script: 'app.js '})
  .on('start', ['test']);
});
