'use strict';

var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	uglify			= require('gulp-uglify'),
	autoprefixer 	= require('gulp-autoprefixer'),
	exec 			= require('child_process').exec;

var paths = {
	css: 	'./css',
	scss: 	'./scss/style.scss',
};

gulp.task('styles', function() {
	return gulp.src(paths.scss)
		.pipe(sass({
			precision: 10,
			outputStyle: 'compressed',
			// outputStyle: 'expanded',
			// outputStyle: 'nested',
			// outputStyle: 'compact',
			onError: console.error.bind(console, 'Sass error:'),
		}))
		.pipe(autoprefixer({
			// browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest(paths.css));
});

gulp.task('watch', function() {
	gulp.start('server');
	// gulp.watch([paths.s_js], ['js']);
	gulp.watch([paths.scss], ['styles']);
	
});

gulp.task('server', function() {
	exec('php -S localhost:8001 -t _dist/', function (err, stdout, stderr) {
		// console.debug(stdout);
		// console.debug(stderr);
	});
});

gulp.task('default', function() {
	gulp.start('watch');
});