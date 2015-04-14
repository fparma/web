var gulp = require('gulp');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
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
        }).on('error', function(err){
            gutil.log(gutil.colors.red(err));
            this.emit('end');
        }))
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(gulpif(createSourceMaps, sourcemaps.write('./')))
        .pipe(gulp.dest(dist_folder + '/css'))
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(reload({stream: true}));
});

gulp.task('clean-vendor-non-js', function(callback) {
    del([
            path.join(dist_folder, 'css/vendor.min**'),
            path.join(dist_folder, 'fonts')
        ],
        function onDeleted() {
            callback();
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

    nodemon({
            script: 'server.js',
            // watch core server file(s) that require server restart on change
            watch: [
                'server.js',
                'config.js',
                'routes/**/*',
                'schemas/**/*',
                'util/**/*'
            ]
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
                reload();
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

    gulp.watch(paths.copy.indexHTML, ['copy-index']);
    gulp.watch(paths.css.app, ['styles']);
    gulp.watch(paths.templates.input, ['templates']);
    gulp.watch(paths.img.input, ['img']);
    gulp.watch(paths.css.vendor, ['make-vendor-non-js']);
    gulp.watch(paths.vendorJS, ['make-vendor-js']);

    browserSync({
        port: 3000,
        proxy: 'http://localhost:8080'
    });

    gulp.watch([
        dist_folder + '**/*.js',
        dist_folder + '**/*.html'], reload);
});
