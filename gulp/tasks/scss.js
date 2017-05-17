var gulp = require('gulp');
var postcss = require('gulp-postcss');
var scss = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var mqpacker = require("css-mqpacker");
var config = require('../config');


gulp.task('scss', function() {

    var processors = [
        autoprefixer({browsers: ['last 10 versions'], cascade: false}),
        mqpacker({
            sort: function (a, b) {
                a = a.replace(/\D/g,'');
                b = b.replace(/\D/g,'');
                return b-a;
                // replace this with a-b for Mobile First approach
            }
        })
    ];

    return scss(config.src.scss+'*.scss', {
        sourcemap: true,
        style: 'compact',
        emitCompileError: true
    })
    .on('error', notify.onError({
        title: 'Scss Error!',
        message: '<%= error.message %>'
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('scss:watch', function() {
    gulp.watch(config.src.scss + '/**/*', ['scss']);
});