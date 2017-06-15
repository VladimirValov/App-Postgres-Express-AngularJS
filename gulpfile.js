'user strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const uglify = require('gulp-uglify');
const newer = require('gulp-newer');
const del = require('del');


gulp.task('clean', function() {
//  console.log("clean public");
  return del(['public']);
})

gulp.task('html', function() {
  return gulp.src('source/**/*.html' /*, {since : gulp.lastRun('html')}*/)

  .pipe(newer('public')) //Только обновленные файлы

  .pipe(debug({title: 'src'}))
  .pipe(gulp.dest('public'));
})


gulp.task('build', ['html'], function() {

  gulp.watch('source/**/*.html', ['html']);
});
