gulp = require('gulp');
sass = require('gulp-sass');
watch = require('gulp-watch');
autoprefixer = require('gulp-autoprefixer');
concat = require('gulp-concat');

var templates = 'src/*.html';
gulp.task('build:templates', function () {
    return gulp.src(templates)
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:templates', function () {
    return gulp.src(templates)
        .pipe(watch(templates))
        .pipe(gulp.dest('dist'));
});

var css = 'src/styles/**/*.scss';
gulp.task('build:css', function () {
    return gulp.src(css)
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch:css', function () {
    return gulp.src(css)
        .pipe(watch(css))
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});

var js = 'src/app/**/*.js';
gulp.task('build:js', function () {
    return gulp.src(js)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch:js', function () {
    return gulp.src(js)
        .pipe(watch(js))
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'));
});

var images = 'src/images/**/*';
gulp.task('collect:images', function () {
    return gulp.src(images)
        .pipe(gulp.dest('dist/images'));
});

gulp.task('build', ['build:templates', 'build:css', 'build:js', 'collect:images']);
gulp.task('watch', ['watch:templates', 'watch:css', 'watch:js']);
gulp.task('default', ['build', 'watch']);