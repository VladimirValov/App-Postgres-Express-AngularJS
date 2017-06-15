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
  return gulp.src('source/**/*.html')
  .pipe(newer('public')) //Только обновленные файлы
  .pipe(debug({title: 'src'}))
  .pipe(gulp.dest('public'));
})

gulp.task('js', function() {
  return gulp.src([
    '!source/libs/*.js',
    '!source/bower_components/**/*.js',
    'source/**/*.module.js',
    'source/**/*.js'
  ])
  .pipe(babel())
  .pipe(debug({title: 'babel'}))
  .pipe(concat("script.js"))
//  .pipe(debug({title: 'concat'}))
//  .pipe(uglify(/*{ mangle: false }*/))
//  .pipe(debug({title: 'uglify'}))
  .pipe(gulp.dest('public/js'));
})


gulp.task('lib', function() {
  return gulp.src([
    'source/bower_components/angular/angular.js'
  ])
  .pipe(newer('public/lib')) //Только обновленные файлы
  .pipe(debug({title: 'src'}))
  .pipe(gulp.dest('public/lib'));
})


gulp.task('build', ['lib', 'html', 'js'], function() {
  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/lib/*.js', ['lib']);
  gulp.watch('source/**/*.js', ['js']);
});
