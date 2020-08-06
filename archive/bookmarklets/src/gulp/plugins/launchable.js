/* globals Buffer */
var _ = require('lodash'),
    glob = require('glob'),
    path = require('path'),
    fs = require('fs'),
    through = require('through2'),
    template;

// Use handlebars like syntax
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

template = _.template([
    "<li class='gotdibbs-toolbox-item'>",
        "<a href='javascript:{{ Script }}' title='{{ Description }}' class='gotdibbs-toolbox-item-link'>{{ Title }}</a>",
    "</li>"
].join(''));

function processFile(file, snippets, fileFormat) {
    var contents = file.contents.toString(fileFormat),
        matches,
        snippetName,
        r,
        snippetContents;

    _.each(snippets, function (snippet) {
        snippetName = path.basename(snippet, '.js').replace(/-/g, '\\-');
        r = new RegExp('\\[bookmarklet file="' + snippetName + '" name="(.+)" description="(.+)"\\]', 'gi');

        matches = r.exec(contents);

        if (matches && matches.length === 3) {
            snippetContents = fs.readFileSync(snippet, fileFormat);
            contents = contents.replace(r, template({
                    Script: snippetContents,
                    Title: matches[1],
                    Description: matches[2]
                }));
        }
    });

    file.contents = new Buffer(contents);
}

module.exports = function defineTask(options) {
    var globPattern = options.pattern,
        fileFormat = options.format || 'utf8';

    return function doReplace() {
        return through.obj(function (file, encoding, callback) {
            glob(globPattern, function (error, snippets) {
                if (error) {
                    console.error(error);
                    return callback(error);
                }

                processFile(file, snippets, fileFormat);

                callback(null, file);
            });
        });
    };
};