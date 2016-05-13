/*jshint strict: false */

import gulp from 'gulp'; 
import clean from 'gulp-clean';

gulp.task('clean-all', ['clean-publish', 'clean-jspm', 'clean-modules', 'clean-app', 'clean-styles', 'clean-coverage']);

gulp.task('clean-jspm', function () {
	return gulp.src('jspm_packages', {read: false})
		.pipe(clean());
});

gulp.task('clean-modules', function () {
	return gulp.src('node_modules', {read: false})
		.pipe(clean());
});

gulp.task('clean-app', function () {
	return gulp.src('app', {read: false})
		.pipe(clean());
});

gulp.task('clean-styles', function () {
	return gulp.src('styles', {read: false})
		.pipe(clean());
});

gulp.task('clean-coverage', function() {
    return gulp.src('coverage', {read: false})
    .pipe(clean());
});

gulp.task('clean-publish', function() {
    return gulp.src('publish', {read: false})
    .pipe(clean());
});
