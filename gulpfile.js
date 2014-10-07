var path = {};
	path.js		= './assets/js/';
	path.css	= './assets/css/';
	path.less	= './less/';

var gulp 		= require('gulp'),
	less		= require('gulp-less'),
	prefix		= require('gulp-autoprefixer'),
	rename		= require('gulp-rename'),
	express		= require('express'),
	app			= express();

gulp.task('less', function () {
	return gulp.src(path.less + 'main.less')
		.pipe(less())
		.pipe(prefix())
		.pipe(rename('stylesheet.css'))
		.pipe(gulp.dest(path.css));
});

gulp.task('server', function () {
	app.use('/', express.static(__dirname));

	var server = app.listen(8080, function() {
		console.log('Listening to port %d', server.address().port);
	});
});

gulp.task('default', function () {
	gulp.run('less');
	gulp.run('server');

	gulp.watch(path.less + '**/*.less', ['less']);
});