/*global require: false*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var watch = require('gulp-watch');
var express = require('express');
var browserSync = require('browser-sync');
var stylus = require('gulp-stylus');
var nodemon = require('gulp-nodemon');

var reload = browserSync.reload;

var BROWSER_SYNC_RELOAD_DELAY = 500;
var CLIENT_FOLDER = './client';
var DIST_FOLDER = './public';
var nonJsFiles = [
    CLIENT_FOLDER + '/css/vendor/**/*',
    CLIENT_FOLDER +'/**/*.html',
    CLIENT_FOLDER +'/vendor/**/*'
];

gulp.task('clean', function(cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del([DIST_FOLDER + '/**/*'], cb);
});

gulp.task('copy', ['clean'], function() {

    gulp.run('styles');

    return gulp.src(nonJsFiles, {
            base: __dirname + CLIENT_FOLDER
        })
        .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('styles', function() {
    gulp.src(CLIENT_FOLDER + '/css/app.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DIST_FOLDER));
});

var bundler;
gulp.task('watch', function(cb) {

    gulp.watch(nonJsFiles).on('change', handle);
    gulp.watch(nonJsFiles).on('add', handle);
    gulp.watch(nonJsFiles).on('unlink', handle);

    function handle(vinyl) {
        gulp.src(vinyl.path, {
            base: __dirname + CLIENT_FOLDER.substr(1)
        }).pipe(gulp.dest(DIST_FOLDER));
    }
    gulp.watch(CLIENT_FOLDER + '/css/**/*.styl', ['styles']);

    bundler = watchify(browserify(CLIENT_FOLDER + '/app.js', {
        cache: {},
        packageCache: {},
        fullPaths: false,
        debug: false
    }));
    // add any other browserify options or transforms here
    bundler.transform('brfs');

    bundler.on('update', bundle); // on any dep update, runs the bundler
    bundler.on('log', gutil.log); // output build logs to terminal
    bundle();
    cb();
});

function bundle() {

    gutil.log('Clean & bundle...');

    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('app.js'))
        .pipe(rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(buffer())
        .pipe(gulp.dest(DIST_FOLDER))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DIST_FOLDER));
}

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'server.js',

    // watch core server file(s) that require server restart on change
    watch: ['server.js', 'config.js', './routes/**/*', './schemas/**/*', './controllers/**/*']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function() {
        reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
}); 

gulp.task('default', ['copy', 'watch', 'nodemon'], function() {
    browserSync({
        port: 3000,
        proxy: 'http://localhost:8080'
    });

    gulp.watch(DIST_FOLDER + '/**/*.css', function() {
        reload({});
    });
    gulp.watch([DIST_FOLDER + '/**/*.js', DIST_FOLDER + '/**/*.html'])
        .on('change', reload);
});