/* globals Buffer */
var _ = require('lodash'),
    glob = require('glob'),
    path = require('path'),
    fs = require('fs'),
    template;

// Use handlebars like syntax
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

template = _.template([
    "<a href='javascript:{{ Script }}' class='card bookmarklet' title='Drag me to your bookmarks bar!'>",
        "<div class='card-block'>",
            "<header class='bookmarklet-header'>{{ Title }}</header>",
            "<span class='card-text bookmarklet-description' data-description='{{ Description }}'></span>",
        "</div>",
    "</a>"
].join(''));

function processFiles(files, snippets, fileFormat) {
    var contents,
        matches,
        snippetName,
        r,
        snippetContents;

    _.chain(files).filter(function filterToHtml(file, fileName) {
        return path.extname(fileName) === '.html';
    }).each(function (file, fileName) {
        contents = file.contents.toString(fileFormat);
        matches;

        if (file.title === 'Bookmarks') {
            return;
        }

        _.each(snippets, function (snippet) {
            snippetName = path.basename(snippet, '.js').replace(/-/g, '\\-');
            r = new RegExp('\\[bookmarklet file="' + snippetName + '" name="(.+)" description="(.+)"\\]', 'gim');
            snippetContents;

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
    }).value();
}

module.exports = function defineTask(options) {
    var globPattern = options.pattern,
        fileFormat = options.format || 'utf8';

    return function doReplace(files, metalsmith, done) {
        glob(globPattern, function (error, snippets) {
            if (error) {
                return console.error(error);
            }

            processFiles(files, snippets, fileFormat);
            
            done();
        });
    };
};