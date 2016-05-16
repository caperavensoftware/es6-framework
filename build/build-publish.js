/*jshint strict: false */

import gulp from 'gulp';
import bump from 'gulp-bump';
import rename from 'gulp-rename';
import through from 'through2'; 

import * as paths from './paths';

function copyJs() {
    return gulp.src(paths.appFiles)
    .pipe(gulp.dest(paths.publishAppPath));
}

function copyStyles() {
    return gulp.src(paths.stylesFiles)
    .pipe(gulp.dest(paths.publishStylesPath));  
}

function copyJSPM() {
    return gulp.src(paths.jspmFiles)
    .pipe(gulp.dest(paths.publishJspmPath)); 
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

function copyIndexHtml() {
    return gulp.src('index.html')
    .pipe(gulp.dest(paths.publishPath));
}

function copyConfigJs() {
    return gulp.src('config.js')
    .pipe(gulp.dest(paths.publishPath));    
}

function cleanPackage(file, encoding, callback) {
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
    if (object.main === 'index.js') {
        throw Error('package.json property "main" must have a descriptive name not "index.js"');
    }
}

gulp.task('build-publish', ['build-all', 'clean-publish'], function(){
    copyJs();
    copyStyles();    
    copyReadMe();
    copyPackageJson();
    copyIndexHtml();
    copyConfigJs();
    copyJSPM();
});

gulp.task('publish-js', copyJs);
gulp.task('publish-css', copyStyles);