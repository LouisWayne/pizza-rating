var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var ngAnnotate = require('browserify-ngannotate');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var watchify = require('watchify');

var paths = {
	pages: ['src/**/*.html'],
	styles: ['src/**/*.scss'],
	bootstrap: 'node_modules/bootstrap/dist',
	dist: 'dist',
	dist_css: 'dist/css',
	dist_fonts: 'dist/fonts'
};

var watchedBrowserify = watchify(getBrowserify());

gulp.task('copy-html', function () {
	return gulp.src(paths.pages)
		.pipe(gulp.dest(paths.dist));
});

gulp.task('copy-css', function() {
	gulp.src(paths.bootstrap + '/css/bootstrap.css').pipe(gulp.dest(paths.dist_css));
	gulp.src(paths.bootstrap + '/css/bootstrap.css.map').pipe(gulp.dest(paths.dist_css));
	gulp.src(paths.bootstrap + '/fonts/*').pipe(gulp.dest(paths.dist_fonts));
	
	var scssStream = gulp.src(paths.styles)
								.pipe(sass())
								.pipe(concat('scss-files.scss'));
	
	return merge(scssStream).pipe(concat('styles.css')).pipe(gulp.dest(paths.dist_css));
});

gulp.task('build', ['copy-html', 'copy-css'], function() {
	getBrowserify()
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(paths.dist));
});

function getBrowserify() {
	return browserify({
		basedir: '.',
		debug: true,
		entries: ['index.ts'],
		transform: [ngAnnotate],
		cache: {},
		packageCache: {}
	}).plugin(tsify);
}

function bundle() {
	return watchedBrowserify
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(paths.dist));
}

gulp.task('default', ['copy-html', 'copy-css'], bundle);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);