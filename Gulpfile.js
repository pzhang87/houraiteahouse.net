gulp = require('gulp');
sass = require('gulp-sass');
watch = require('gulp-watch');
autoprefixer = require('gulp-autoprefixer');
concat = require('gulp-concat');
http = require('http');
livereload = require('gulp-livereload');
st = require('st');

var HTTP_PORT = 8080,
    LIVERELOAD_PORT = 35729;

var templates = 'src/*.html';
gulp.task('build:templates', function () {
    return gulp.src(templates)
        .pipe(gulp.dest('dist'));
});

gulp.task('reload:templates', function () {
    return gulp.src(templates)
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

var css = 'src/styles/**/*.scss';
gulp.task('build:css', function () {
    return gulp.src(css)
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('reload:css', function () {
    return gulp.src(css)
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

var js = 'src/app/**/*.js';
gulp.task('build:js', function () {
    return gulp.src(js)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('reload:js', function () {
    return gulp.src(js)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());;
});

var images = 'src/images/**/*';
gulp.task('collect:images', function () {
    return gulp.src(images)
        .pipe(gulp.dest('dist/images'));
});

gulp.task('serve', function (done) {
    http.createServer(st({
        path: __dirname + '/dist',
        index: 'index.html',
        cache: false
    })).listen(HTTP_PORT, done);
});

gulp.task('build', ['build:templates', 'build:css', 'build:js', 'collect:images']);
gulp.task('serve:watch', ['serve'], function () {
    livereload.listen({
        host: 'localhost',
        port: LIVERELOAD_PORT,
        basePath: 'dist'
    });

    gulp.watch(templates, ['reload:templates']);
    gulp.watch(css, ['reload:css']);
    gulp.watch(js, ['reload:js']);
});

gulp.task('default', ['build', 'serve:watch']);