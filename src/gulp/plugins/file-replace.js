/* globals Buffer */
var _ = require('lodash'),
    glob = require('glob'),
    path = require('path'),
    fs = require('fs');
    
function processFiles(files, snippets, fileFormat) {
    _.chain(files).filter(function filterToHtml(file, fileName) {
        return path.extname(fileName) === '.html';
    }).each(function (file, fileName) {
        var contents = file.contents.toString(fileFormat);
        
        _.each(snippets, function (snippet) {
            var snippetName = path.basename(snippet, '.js').replace(/-/g, '\\-'),
                r = new RegExp('\\[js ' + snippetName + '\\]', 'gi');
            
            if (r.test(contents)) {
                var snippetContents = fs.readFileSync(snippet, fileFormat);
                contents = contents.replace(r, 'javascript:' + snippetContents);
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