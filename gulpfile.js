var gulp = require('gulp'),
    hf = require('gulp-headerfooter'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

gulp.task('build', function() {
    return gulp.src('./src/bookmarklets/*.js')
        .pipe(hf.header('./src/intro.js'))
        .pipe(hf.footer('./src/outro.js'))
        .pipe(uglify())
        // Nested quotes cause issues when the script isembedded in an 
        //  anchor tag, but only in this one spot, so limit the scope of
        //  replace to that spot for now.
        .pipe(replace('\'visibility: hidden\'', '\\"visibility: hidden\\"'))
        .pipe(gulp.dest('./dist/'));
});