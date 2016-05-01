var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');


gulp.task('styles', function() {
  return sass('assets/scss/style.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/images']);
});


gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  gulp.watch('assets/scss/**/*.scss', ['styles']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch('assets/images/**/*', ['images']);
  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);

});