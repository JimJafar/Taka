/**
 * @author Jim Sangwine
 */

var version = '0.1.1';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Require dependencies (defined in www/packages.json)
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autowatch = require('gulp-autowatch');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jsdoc = require('gulp-jsdoc');
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var clean = require('gulp-clean');
var cover = require('gulp-coverage');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var zip = require('gulp-zip');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Setup paths and file lists
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var paths = {
    in : {
        config: './source/js/TakaConfig.js',
        js : [
            './source/js/Taka.js',
            './source/js/utils/BoxUtil.js',
            './source/js/core/Control.js',
            './source/js/core/Engine.js',
            './source/js/core/Renderer.js',
            './source/js/core/Timer.js',
            './source/js/assets/Cache.js',
            './source/js/assets/Assets.js',
            './source/js/vehicles/Vehicle.js',
            './source/js/vehicles/PlayerVehicle.js',
            './source/js/vehicles/DroneVehicle.js',
            './source/js/vehicles/formations/Formation.js',
            './source/js/vehicles/formations/A5Formation.js',
            './source/js/vehicles/formations/V5Formation.js',
            './source/js/ordnance/Bullet.js',
            './source/js/ordnance/PlayerBullet.js',
            './source/js/ordnance/SmallBullet.js',
            './source/js/effects/Effect.js',
            './source/js/effects/ExplosionEffect.js',
            './source/js/levels/Level.js'
        ],
        resources : './source/resources/**/*'
    },
    out : {
        config: 'Taka-conf.js',
        js : './build/js',
        resources : './build/resources',
        root : './build'
    },
    jasmine : {
        coverage : 'coverage.html',
        reports : {
            in : 'TEST-*.xml',
            out : './test/js/reports'
        },
        specrunner : './test/js/specrunner.html',
        specs : './test/js/specs/**/*.js'
    },
    jsdoc : {
        template : './documentation/jsdoc-lib/jsdoctemplate/docstrap-master/template',
        output : './documentation/output'
    },
    watch : {
        // key = task name to run
        // value = glob or array of globs to watch
        js : [
            './source/js/**/*.js'
        ],
        resources : [
            './source/resources/**/*'
        ]
    }
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Aggregated tasks
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Default task
gulp.task('default', ['test', 'js', 'resources', 'jsdoc']);

// Grouped tasks
gulp.task('js', function(callback) {
    runSequence('jshint', 'concat_js', 'minify_js', 'copy_config', 'archive', callback);
});
gulp.task('test', function(callback) {
    runSequence('test_js', 'move_jasmine_reports', 'move_coverage_reports', callback);
});
gulp.task('archive', function(callback) {
    runSequence('archive_tar', 'archive_zip', callback);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Watch task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('watch', function(cb) {
    autowatch(gulp, paths.watch);
    return cb();
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JSHint task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('jshint', function() {
    return gulp.src(paths.in.js)
        .pipe(jshint({ devel: true, evil: true, noarg: true} ))
        .pipe(jshint.reporter('default'));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JS concatenation task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('concat_js', function() {
    return gulp.src(paths.in.js)
        .pipe(concat('Taka.js'))
        .pipe(gulp.dest(paths.out.js));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JS minification task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('minify_js', function() {
    // Wrap the operation to allow it to gracefully handle and log errors so as not to disrupt the watch task
    // Has to be redefined in each task in case the pipe was closed by a previous task
    var _uglify = uglify({});
    _uglify.on('error', function(e) {
        gutil.log(e);
        _uglify.end();
    });
    
    return gulp.src([paths.out.js+'/Taka.js'])
        .pipe(_uglify)
        .pipe(rename(function (path) {
            path.extname = "-min.js";
        }))
        .pipe(gulp.dest(paths.out.js));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for copying config to the build directory
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('copy_config', function() {
    return gulp.src(paths.in.config)
        .pipe(rename(paths.out.config))
        .pipe(gulp.dest(paths.out.js));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JS documentation task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

jsdocConf = {
    destination : paths.jsdoc.output,
    template : {
        path : paths.jsdoc.template,
        systemName : 'Taka',
        copyright : new Date().getFullYear() + ' Jim Sangwine',
        theme : 'spacelab',
        linenums : true,
        collapseSymbols : false,
        outputSourceFiles : true
    },
    infos : {
        name : 'Taka',
        description : 'A pure JavaScript &amp; Canvas SHMUP engine',
        version : version,
        licenses : ''
    },
    options: {
        'private': true,
        monospaceLinks: false,
        cleverLinks: false,
        outputSourceFiles: true,
        recurse: true
    }
};

gulp.task('jsdoc', function() {
    return gulp.src(paths.in.js)
        .pipe(jsdoc(jsdocConf.destination, jsdocConf.template, jsdocConf.infos, jsdocConf.options))
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Jasmine BDD JS unit testing task
 * - don't run directly - use "gulp test" instead
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('test_js', function() {
    return gulp.src(paths.jasmine.specrunner)
        .pipe(cover.instrument({
            pattern: [paths.jasmine.reports.in],
            debugDirectory: 'debug'
        }))
        .pipe(jasminePhantomJs(['--web-security=false', '--load-images=false']))
        .pipe(cover.report({
            outFile: paths.jasmine.coverage
        }));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for moving Jasmine reports to the
 * test/js/reports directory
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('move_jasmine_reports', function() {
    return gulp.src(paths.jasmine.reports.in)
        .pipe(clean())
        .pipe(gulp.dest(paths.jasmine.reports.out));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for moving test coverage report to the
 * test/js/reports directory
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('move_coverage_reports', function() {
    return gulp.src(paths.jasmine.coverage)
        .pipe(clean())
        .pipe(gulp.dest(paths.jasmine.reports.out));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for copying resources to the build directory
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('resources', function() {
    return gulp.src(paths.in.resources)
        .pipe(gulp.dest(paths.out.resources));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for creating the TAR archive
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('archive_tar', function () {
    return gulp.src(paths.out.js+'/*.js')
        .pipe(tar('Taka-'+version+'-min.tar'))
        .pipe(gzip())
        .pipe(gulp.dest(paths.out.root));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for creating the ZIP archive
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('archive_zip', function () {
    return gulp.src(paths.out.js+'/*.js')
        .pipe(zip('Taka-'+version+'-min.zip'))
        .pipe(gulp.dest(paths.out.root));
});
