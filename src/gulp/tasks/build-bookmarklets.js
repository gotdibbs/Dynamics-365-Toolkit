var hf = require('gulp-headerfooter'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

module.exports = function defineTask(gulp) {

	return function buildBookmarklets() {
	    return gulp.src('./src/bookmarklets/!(intro.js|outro.js)')
	        .pipe(hf.header('./src/bookmarklets/intro.js'))
	        .pipe(hf.footer('./src/bookmarklets/outro.js'))
	        .pipe(uglify())
	        // Nested quotes cause issues when the script isembedded in an 
	        //  anchor tag, but only in this one spot, so limit the scope of
	        //  replace to that spot for now.
	        .pipe(replace('\'visibility: hidden\'', '\\"visibility: hidden\\"'))
	        .pipe(gulp.dest('./dist/bookmarklets/'));
	};

};