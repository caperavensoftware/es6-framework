/*jshint strict: false */

import gulp from 'gulp';
import sass from 'gulp-sass';
import paths from './paths';

gulp.task('build-sass', ['clean-styles'], function () {  
  return gulp.src(paths.sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.stylesPath));
});
 
gulp.task('sass:watch', function() {
    gulp.watch(paths.sassFiles, ['build-sass']);
});
