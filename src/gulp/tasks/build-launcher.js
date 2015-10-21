var launchable = require('../plugins/launchable'),
    esc = require('../plugins/escape'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    insertLaunchers;

insertLaunchers = launchable({
    pattern: './dist/bookmarklets/**/*.js',
});

module.exports = function defineTask(gulp) {

    return function buildBookmarklets() {
        return gulp.src('./src/launcher/launcher.js')
            .pipe(insertLaunchers())
            .pipe(uglify({
                compress: {
                    // Prevent fn wrapper from being mangled for FireFox
                    negate_iife: false
                }
            }))
            .pipe(esc())
            .pipe(gulp.dest('./dist/bookmarklets/'));
    };

};