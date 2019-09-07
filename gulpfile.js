'use strict';

var autoprefixerList = [
    'Chrome >= 45'
    , 'Firefox ESR'
    , 'Edge >= 12'
    , 'Explorer >= 10'
    , 'iOS >= 9'
    , 'Safari >= 9'
    , 'Android >= 4.4'
    , 'Opera >= 30'
];

var path = {
	build: {
		html: 'dist/'
		, js: 'dist/js/'
		, css: 'dist/css/'
		, img: 'dist/img/'
		, fonts: 'dist/fonts/'
	}
	, src: {
		html: 'assets/*.html'
		, js: 'assets/js/*.js'
		, jsplugins: 'assets/js/libs/**/*.*'
		, style: 'assets/scss/main.scss'
		, img: 'assets/img/**/*.*'
		, fonts: 'assets/fonts/**/*.*'
	}
	, watch: {
		html: 'assets/**/*.html'
		, js: 'assets/js/*.js'
		, jsplugins: 'assets/js/libs/**/*.*'
		, css: 'assets/scss/**/*.scss'
		, img: 'assets/img/**/*.*'
		, fonts: 'assets/fonts/**/*.*'
	}
	, clean: './dist/*'
};

var config = {
	server: {
		baseDir: './dist'
	},
	files: [
        './dist/css/*.css'
    ],
	notify: false
};

var gulp = require('gulp'),
	webserver = require('browser-sync'),
	plumber = require('gulp-plumber'),
	fileinclude = require('gulp-file-include'),
	rigger = require('gulp-rigger'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	jpegrecompress = require('imagemin-jpeg-recompress'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('gulp-rimraf'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat');


gulp.task('webserver', function () {
	webserver.init(config);
});


gulp.task('html:build', function () {
	return gulp.src(path.src.html)
		.pipe(plumber())
		.pipe(fileinclude({
			prefix: '@@'
			, basepath: '@file'
		}))
		.pipe(gulp.dest(path.build.html));
});



gulp.task('css:build', function () {
	return gulp.src(path.src.style)
		.pipe(sass({
			noCache: true
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: autoprefixerList
		}))
		.pipe(gulp.dest(path.build.css))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest(path.build.css));
});

gulp.task('watch:css', function() {
    return gulp.watch(path.watch.css, gulp.series('css:build'));
});



gulp.task('jsplugins:build', function () {
    return gulp.src(path.src.jsplugins)
		.pipe(concat('scripts.js'))
        .pipe(rename('plugins.min.js'))
		.pipe(uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(gulp.dest(path.build.js));
});


gulp.task('js:build', function () {
	return gulp.src(path.src.js)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js));
});

gulp.task('fonts:build', function () {
	return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task('image:build', function () {
	return gulp.src(path.src.img)
		.pipe(cache(imagemin([
            imagemin.gifsicle({
				interlaced: true
			})
            , jpegrecompress({
				progressive: true
				, max: 90
				, min: 80
			})
            , pngquant()
            , imagemin.svgo({
				plugins: [{
					removeViewBox: false
				}]
			})
        ]))).pipe(gulp.dest(path.build.img));
});

gulp.task('clean:build', function () {
	return gulp.src(path.clean, {
		read: false
	}).pipe(rimraf());
});

gulp.task('cache:clear', function () {
	cache.clearAll();
});

gulp.task('build', gulp.series('clean:build', gulp.parallel('html:build', 'css:build', 'js:build', 'jsplugins:build', 'fonts:build', 'image:build')));


gulp.task('watch', function () {
	gulp.watch(path.watch.html, gulp.series('html:build')).on('change', webserver.reload);
	gulp.watch(path.watch.js, gulp.series('js:build')).on('change', webserver.reload);
	gulp.watch(path.watch.jsplugins, gulp.series('jsplugins:build')).on('change', webserver.reload);
	gulp.watch(path.watch.img, gulp.series('image:build')).on('change', webserver.reload);
	gulp.watch(path.watch.fonts, gulp.series('fonts:build')).on('change', webserver.reload);
});

gulp.task('default', gulp.series(gulp.parallel('watch', 'watch:css', 'webserver')));
