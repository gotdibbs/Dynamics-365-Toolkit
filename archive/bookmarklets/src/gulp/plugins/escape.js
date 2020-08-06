/* globals Buffer, escape */
var through = require('through2');

module.exports = function defineTask(options) {
    var fileFormat = options && options.format ?
        options.format : 'utf8';

    return through.obj(function (file, encoding, callback) {
        var contents = file.contents.toString(fileFormat);

        contents = escape(contents);

        file.contents = new Buffer(contents);

        callback(null, file);
    });
};