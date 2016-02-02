var launchable = require('../plugins/launchable'),
    replace = require('gulp-replace'),
    insertLaunchers;

insertLaunchers = launchable({
    pattern: './dist/bookmarklets/**/*.js',
});

module.exports = function defineTask(gulp) {

    return function buildBookmarklets() {
        return gulp.src('./src/fragments/**/*.html')
            .pipe(insertLaunchers())
            .pipe(gulp.dest('./dist/site/'));
    };

};