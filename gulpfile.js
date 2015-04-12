var gulp = require('gulp');
var gulpif = require('gulp-if');
var merge = require('merge-stream');
var path = require('path');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var minifyHTML = require('gulp-minify-html');

var BROWSER_SYNC_RELOAD_DELAY = 500;
var createSourceMaps = true;

var client_root = './client/';
var dist_folder = './public/';

var paths = {
    templates: {
        input: path.join(client_root, 'views/**/*.html'),
        output: path.join(dist_folder, 'views/')
    },
    img: {
        input: path.join(client_root, 'img/**/*'),
        output: path.join(dist_folder, 'img')
    },
    css: {
        app: path.join(client_root, 'styl/app.styl'),
        vendor: path.join(client_root, 'vendor/css/**/*.css')
    },
    copy: {
        fonts: path.join(client_root, 'vendor/fonts/**/*'),
        indexHTML: path.join(client_root, 'index.html')
    },
    vendorJS: [
        path.join(client_root, 'vendor/js/angular.min.js'),
        path.join(client_root, 'vendor/js/*.js')
    ],
    js: {
        app: path.join(client_root, 'js/app.js')
    }
};

gulp.task('clean-templates', function(callback) {
    del([paths.templates.output],
        function onDeleted() {
            callback();
        });
});
gulp.task('templates', ['clean-templates'], function() {
    return gulp.src(paths.templates.input)
        .pipe(minifyHTML())
        .pipe(gulp.dest(paths.templates.output));
});


gulp.task('clean-img', function(callback) {
    del([paths.img.output],
    function onDeleted() {
        callback();
    });
});
gulp.task('img', ['clean-img'], function() {
    return gulp.src(paths.img.input)
    .pipe(gulp.dest(paths.img.output));
});


gulp.task('clean-style-files', function(callback) {
    del([path.join(dist_folder, 'css/app.min**')], function() {
        callback();
    });
});
// Compiles stylus to app.css
gulp.task('styles', ['clean-style-files'], function() {
    return gulp.src(paths.css.app)
        .pipe(gulpif(createSourceMaps, sourcemaps.init()))
        .pipe(stylus({
            compress: true
        }))
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(gulpif(createSourceMaps, sourcemaps.write('./')))
        .pipe(gulp.dest(dist_folder + '/css'));
});

gulp.task('clean-vendor-non-js', function(callback) {
    del([
            path.join(dist_folder, 'css/vendor.min**'),
            path.join(dist_folder, 'fonts')
        ],
        function onDeleted() {
            callback()
        });
});
gulp.task('make-vendor-non-js', ['clean-vendor-non-js'], function() {

    // merge all vendor css files and put into vendor.min.css
    var css = gulp.src(paths.css.vendor)
        .pipe(concatCss('vendor'))
        .pipe(gulpif(createSourceMaps, sourcemaps.init()))
        .pipe(minifyCSS({
            keepSpecialComments: false,
            rebase: false,
            roundingPrecision: -1
        }))
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(gulpif(createSourceMaps, sourcemaps.write('./')))
        .pipe(gulp.dest(path.join(dist_folder, 'css')));

    // copy fonts
    var fonts = gulp.src(paths.copy.fonts)
        .pipe(gulp.dest(path.join(dist_folder, 'fonts')));

    return merge(css, fonts);
});

gulp.task('clean-vendor-js', function(callback) {
    del([path.join(dist_folder, 'js/vendor.min**')],
        function onDeleted() {
            callback();
        });
});

gulp.task('make-vendor-js', ['clean-vendor-js'], function() {
    return gulp.src(paths.vendorJS)
        .pipe(concat('vendor'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(gulp.dest(path.join(dist_folder, 'js'))); 
});

gulp.task('copy-index', function() {
    return gulp.src(paths.copy.indexHTML)
        .pipe(gulp.dest(dist_folder));
});

var bundler;
gulp.task('bundle', function(cb) {

    bundler = watchify(browserify(client_root + 'js/app.js', {
        cache: {},
        packageCache: {},
        fullPaths: false,
        debug: true
    }));
    // add any other browserify options or transforms here
    bundler.transform('brfs');

    bundler.on('update', bundle); // on any dep update, runs the bundler
    bundler.on('log', gutil.log); // output build logs to terminal
    bundle();
    cb();
});
function bundle() {

    gutil.log('Bundle...');

    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('app.js'))
        .pipe(rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(buffer())
        .pipe(gulp.dest(path.join(dist_folder, 'js')))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.join(dist_folder, 'js')));
}

gulp.task('nodemon', function(cb) {
    var called = false;

    return nodemon({
            script: 'server.js',
            // watch core server file(s) that require server restart on change
            watch: ['server.js', 'config.js', './routes/**/*', './schemas/**/*']
        })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) {
                cb();
            }
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

gulp.task('default', [
    'copy-index',
    'templates',
    'img',
    'styles',
    'make-vendor-non-js',
    'make-vendor-js',
    'bundle',
    'nodemon'
    ], function() {

    gulp.watch(paths.indexHTML, ['copy-index']);
    gulp.watch(paths.css.app, ['styles']);
    gulp.watch(paths.templates.input, ['templates']);
    gulp.watch(paths.img.input, ['img']);
    gulp.watch(paths.css.vendor, ['make-vendor-non-js']);
    gulp.watch(paths.vendorJS, ['make-vendor-js']);

    browserSync({
        port: 3000,
        proxy: 'http://localhost:8080'
    });

    gulp.watch(dist_folder + '**/*.css', function() {
        reload({
            stream: true
        });
    });

    gulp.watch([
        dist_folder + '**/*.js',
        dist_folder+ '**/*.html']
    ).on('change', reload);
});





// var watch = require('gulp-watch');
// var express = require('express');
// var browserSync = require('browser-sync');


// var reload = browserSync.reload;

// var BROWSER_SYNC_RELOAD_DELAY = 500;
// var CLIENT_FOLDER = './client';
// var DIST_FOLDER = './public';
// var nonJsFiles = [
//     CLIENT_FOLDER + '/css/vendor/**/*',
//     CLIENT_FOLDER +'/**/*.html',
//     CLIENT_FOLDER +'/vendor/**/*',
//     CLIENT_FOLDER + '/img/**/*'
// ];

// gulp.task('clean', function(cb) {
//     // You can use multiple globbing patterns as you would with `gulp.src`
//     del([DIST_FOLDER + '/**/*'], cb);
// });

// gulp.task('copy', ['clean'], function() {

//     gulp.run('styles');

//     return gulp.src(nonJsFiles, {
//             base: __dirname + CLIENT_FOLDER
//         })
//         .pipe(gulp.dest(DIST_FOLDER));
// });

// gulp.task('styles', function() {
//     gulp.src(CLIENT_FOLDER + '/css/app.styl')
//         .pipe(sourcemaps.init())
//         .pipe(stylus({
//             compress: true
//         }))
//         .pipe(rename({
//             suffix: '.min',
//             extname: '.css'
//         }))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest(DIST_FOLDER));
// });

// var bundler;
// gulp.task('watch', function(cb) {

//     gulp.watch(nonJsFiles).on('change', handle);
//     gulp.watch(nonJsFiles).on('add', handle);
//     gulp.watch(nonJsFiles).on('unlink', handle);

//     function handle(vinyl) {
//         gulp.src(vinyl.path, {
//             base: __dirname + CLIENT_FOLDER.substr(1)
//         }).pipe(gulp.dest(DIST_FOLDER));
//     }
//     gulp.watch(CLIENT_FOLDER + '/css/**/*.styl', ['styles']);

//     bundler = watchify(browserify(CLIENT_FOLDER + '/app.js', {
//         cache: {},
//         packageCache: {},
//         fullPaths: false,
//         debug: false
//     }));
//     // add any other browserify options or transforms here
//     bundler.transform('brfs');

//     bundler.on('update', bundle); // on any dep update, runs the bundler
//     bundler.on('log', gutil.log); // output build logs to terminal
//     bundle();
//     cb();
// });

// function bundle() {

//     gutil.log('Clean & bundle...');

//     return bundler.bundle()
//         .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//         .pipe(source('app.js'))
//         .pipe(rename({
//             suffix: '.min',
//             extname: '.js'
//         }))
//         .pipe(buffer())
//         .pipe(gulp.dest(DIST_FOLDER))
//         .pipe(sourcemaps.init({
//             loadMaps: true
//         }))
//         .pipe(uglify())
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest(DIST_FOLDER));
// }

// gulp.task('nodemon', function (cb) {
//   var called = false;
//   return nodemon({

//     // nodemon our expressjs server
//     script: 'server.js',

//     // watch core server file(s) that require server restart on change
//     watch: ['server.js', 'config.js', './routes/**/*', './schemas/**/*', './controllers/**/*']
//   })
//     .on('start', function onStart() {
//       // ensure start only got called once
//       if (!called) { cb(); }
//       called = true;
//     })
//     .on('restart', function onRestart() {
//       // reload connected browsers after a slight delay
//       setTimeout(function() {
//         reload({
//           stream: false
//         });
//       }, BROWSER_SYNC_RELOAD_DELAY);
//     });
// }); 

// gulp.task('default', ['copy', 'watch', 'nodemon'], function() {
//     browserSync({
//         port: 3000,
//         proxy: 'http://localhost:8080'
//     });

//     gulp.watch(DIST_FOLDER + '/**/*.css', function() {
//         reload({});
//     });
//     gulp.watch([DIST_FOLDER + '/**/*.js', DIST_FOLDER + '/**/*.html'])
//         .on('change', reload);
// });