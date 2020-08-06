var _ = require('lodash'),
    gulp = require('gulp'),
    clean = require('./src/gulp/tasks/clean'),
    buildBookmarklets = require('./src/gulp/tasks/build-bookmarklets'),
    buildLauncher = require('./src/gulp/tasks/build-launcher'),
    transformContent = require('./src/gulp/tasks/transform-content'),
    copyStatic = require('./src/gulp/tasks/copy-static');

gulp.task('clean', clean(gulp));

gulp.task('build-bookmarklets', gulp.series('clean', buildBookmarklets(gulp)));
    
gulp.task('build-launcher', gulp.series('clean', 'build-bookmarklets', buildLauncher(gulp)));
    
gulp.task('transform-content', gulp.series('build-bookmarklets', 'build-launcher', transformContent(gulp)));
    
gulp.task('copy-static',  gulp.series('transform-content', copyStatic(gulp)));
    
gulp.task('default', gulp.series('copy-static'));