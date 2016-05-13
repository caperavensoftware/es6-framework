/*jshint strict: false */

import gulp from 'gulp';
import browserSync from 'browser-sync';
import paths from './paths';

gulp.task('serve', ['build-all'], function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });     
});

gulp.task('serve:watch', ['serve'], function(){
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch(paths.sassFiles, ['build-sass']).on('change', browserSync.reload);
});