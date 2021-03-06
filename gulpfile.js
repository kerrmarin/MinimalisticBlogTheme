'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer-core');

var paths = {
    scripts: ['assets/js/*.js'],
    styles: ['assets/css/styles.scss']
};

//Minify all CSS files
gulp.task('minify-css', function() {
  return gulp.src(paths.styles)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe($.minifyCss())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
    .pipe($.filesize());
});

// Minify and copy all JavaScript (except vendor scripts)
gulp.task('minify-js', function() {
    return gulp.src(paths.scripts)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.concat('main.min.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('assets/js'))
    .pipe($.filesize());
});

//Watch the SCSS folder
gulp.task('watch', function () {
    gulp.watch(paths.styles, ['minify-css']);
    gulp.watch(paths.scripts, ['minify-js']);
});

//Default task
gulp.task('default', ['minify-css', 'minify-js']);
