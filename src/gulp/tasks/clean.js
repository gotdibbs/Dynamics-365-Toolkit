var clean = require('gulp-clean');

module.exports = function defineTask(gulp) {

    return function doClean() {
        return gulp.src('./dist/')
            .pipe(clean({ force: true }));
    };

};