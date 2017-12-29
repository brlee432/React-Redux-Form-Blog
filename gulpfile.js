var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();
webpack = require('webpack');

gulp.task('watch', function ()  {

	browserSync.init({
		notify: false,
		proxy: "localhost:8080",
		browser: 'firefox'

	});

	watch('./style/*.css', function() {
		browserSync.reload();
	});

	watch('./src/**/*.js', function () {
		browserSync.reload();
	});

	watch('./index.html', function () {
		browserSync.reload();
	});

});

gulp.task('scripts', function (callback) {
	webpack(require('./webpack.config.js'), function (err, stats) {
		if (err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback();
	});

});