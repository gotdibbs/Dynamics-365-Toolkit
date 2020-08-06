module.exports = function defineTask(gulp) {

    return function () {
        return gulp.src('./src/public/**/*.*')
            .pipe(gulp.dest('./dist/site/'));
    };

};