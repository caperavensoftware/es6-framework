import gulp from 'gulp';
import bump from 'gulp-bump';
import rename from 'gulp-rename';
import through from 'through2'; 
import fs from 'fs';
import Stream from 'stream';

import * as paths from './paths';

function publishJs() {
    return gulp.src([paths.appFiles, paths.notAppFile])
    .pipe(gulp.dest(paths.publishAppPath));
}

function publishStyles() {
    return gulp.src(paths.stylesFiles)
    .pipe(gulp.dest(paths.publishStylesPath));  
}

function copyReadMe() {
    return gulp.src('_PublishReadMe.md')
    .pipe(rename('README.md'))
    .pipe(gulp.dest(paths.publishPath));
}

function copyPackageJson() {
    return gulp.src('package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'))
    .pipe(through({objectMode: true}, cleanPackage))
    .pipe(gulp.dest(paths.publishPath));
}

function cleanPackage(file, encoding, callback) {
    let error = null;   
    let object = JSON.parse(String(file.contents));    
    let result = file;
    
    validatePackageName(object);        
    delete object.devDependencies;
       
    let stringResult = JSON.stringify(object);
       
    result.contents = new Buffer(stringResult);   
    this.push(result);              
    callback();
}

function validatePackageName(object) {
    if (object.main == 'index.js') {
        throw error('package.json property "main" must have a descriptive name not "index.js"');
    }
}

gulp.task('build-publish', ['build-all', 'clean-publish'], function(){
    publishJs();
    publishStyles();    
    copyReadMe();
    copyPackageJson();
});

gulp.task('publish-js', publishJs);
gulp.task('publish-css', publishStyles);