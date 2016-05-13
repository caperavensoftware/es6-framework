import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import compilerOptions from './babel-options';
import * as paths from './paths';

const assign = Object.assign || require('object.assign');

gulp.task('build-js', ['clean-app'], function() {       
    return gulp.src(paths.sourceFiles)
     .pipe(sourcemaps.init())
     .pipe(babel({
			presets: ['es2015']
		}))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
    .pipe(gulp.dest(paths.destPath));
});