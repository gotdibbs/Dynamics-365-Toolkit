var del = require('del');

module.exports = function defineTask(gulp) {

    return function doClean(done) {
        del([
            './dist/'
        ], done);
    };

};