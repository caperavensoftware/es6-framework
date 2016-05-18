/*jshint strict: false */

import through from 'through2'; 
import ParsedCodeContainer from './test-parser';
import {PrintSummaryContainer} from './test-parser';
import fs from 'fs';
import {Instrumenter} from 'isparta';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
import gulpParam from 'gulp-param';
import gulpInstance from 'gulp';

const gulp = gulpParam(gulpInstance, process.argv);

let sourceContainer = null;
let testContainer = null;

function testUnit(path) {
    return gulp.src(path)
    .pipe(mocha());
}

function coverageUnit(done) {
  gulp.src(['src/**/*.js'])
    .pipe(istanbul({instrumenter: Instrumenter}))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      return testUnit()
      .pipe(istanbul.writeReports())
      .on('end', done);
    });
}

function processSource() {
  return new Promise(function(resolved) {
    gulp.src('src/**/*.js')
    .pipe(through({objectMode: true}, performProcessSource)) 
    .on('finish', resolved);         
  });
}

function performProcessSource(file, encoding, callback) {
    sourceContainer.add(String(file.contents), file.path);        
    this.push(file);
    callback();  
}

function processTests() {
  return new Promise(function(resolved) {
    gulp.src('tests/**/*.js')
    .pipe(through({objectMode: true}, performProcessTests))
    .on('finish', resolved);          
  });
}

function performProcessTests(file, encoding, callback) {
    testContainer.add(String(file.contents), file.path);        
    this.push(file);
    callback();  
}

function processMissingTests() {  
  for (let sourceContainerItem of sourceContainer.codeSummary) {
    console.log(sourceContainerItem.path);        
    sourceContainerItem.checkIfImportedInTests(testContainer.codeSummary);  
  }  
}

function saveMissingTestsJson(done) { 
  let printSummary = new PrintSummaryContainer(sourceContainer.codeSummary);
  
  let dir = './coverage';
  
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }    
  
  fs.writeFile(`${dir}/missingTests.json`, printSummary.jsonText, done);
}

gulp.task('test-unit', function(filename) {
  let path = 'tests/unit/**/*.js';
  
  if (filename) {
    path = `tests/unit/${filename}`;
  }
  
  testUnit(path);
});

gulp.task('coverage-unit', coverageUnit);

gulp.task('missing-tests', function() {
  sourceContainer = new ParsedCodeContainer();
  testContainer = new ParsedCodeContainer();

  processSource().then(processTests()).then(function() {
    processMissingTests();
    saveMissingTestsJson();
  });
});

