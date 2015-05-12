var _ = require('lodash'),
    gulp = require('gulp'),
    clean = require('./src/gulp/tasks/clean'),
    buildBookmarklets = require('./src/gulp/tasks/build-bookmarklets'),
    transformContent = require('./src/gulp/tasks/transform-content'),
    copyStatic = require('./src/gulp/tasks/copy-static');

gulp.task('clean', clean(gulp));

gulp.task('build-bookmarklets', ['clean'], buildBookmarklets(gulp));

gulp.task('transform-content', ['build-bookmarklets'], transformContent(gulp));

gulp.task('copy-static',  ['transform-content'], copyStatic(gulp));

gulp.task('default', ['copy-static']);