var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function ()  {

	browserSync.init({
		
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