var _ = require('lodash');

module.exports = function defineTask(options) {

    return function assignPaths(files, metalsmith, done) {
        _.each(files, function (file) {
            file.path = [file.page, '.html'].join('');
        });
        done();
    };

};