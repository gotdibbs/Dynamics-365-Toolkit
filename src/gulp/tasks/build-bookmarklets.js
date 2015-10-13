var hf = require('gulp-headerfooter'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

module.exports = function defineTask(gulp) {

    return function buildBookmarklets() {
        return gulp.src('./src/bookmarklets/!(intro.js|outro.js)')
            .pipe(hf.header('./src/bookmarklets/intro.js'))
            .pipe(hf.footer('./src/bookmarklets/outro.js'))
            .pipe(uglify({
                compress: {
                    // Prevent fn wrapper from being mangled for FireFox
                    negate_iife: false
                }
            }))
            // Nested quotes cause issues when the script is embedded in an 
            //  anchor tag.
            .pipe(replace('\'', '\\"'))
            .pipe(gulp.dest('./dist/bookmarklets/'));
    };

};