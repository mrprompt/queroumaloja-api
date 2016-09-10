'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy:site', function() {
  return gulp.src('./apidoc/**/*')
    .pipe(ghPages());
});
