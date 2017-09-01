/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

gulp.task('deploy:site', () => {
  return gulp
    .src('./apidoc/**/*')
    .pipe(ghPages());
});
