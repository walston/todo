var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var casper = require('gulp-casperjs');

var app = require('./app.js');
var testServer;

gulp.task('default', function() {
  nodemon({ script: 'app.js '})
  .on('start', ['test']);
});

gulp.task('test', ['serverTest', 'clientTest'], function() {
  return testServer.close();
});

gulp.task('serverTest', ['serverUp'], function() {
  return gulp.src('app.spec.js').pipe(mocha());
});

gulp.task('clientTest', ['serverUp'], function() {
  return gulp.src('casper.test.js').pipe(casper());
});

gulp.task('serverUp', function() {
  return testServer = app.listen(8080);
});
