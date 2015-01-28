var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var reactify = require('reactify');
var transform = require('vinyl-transform');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({browsers: ["last 2 versions"]});

gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    b.transform(reactify);
    return b.bundle();
  });
  return gulp.src(['./src/js/app.js'])
    .pipe(browserified)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('style', function() {
  gulp.src('./src/styles/app.less')
    .pipe(less({
      plugins: [autoprefix]
     }))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('default',['browserify', 'style', 'copy']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.*', ['default']);
});