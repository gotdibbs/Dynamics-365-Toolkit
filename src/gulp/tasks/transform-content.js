var _ = require('lodash'),
    Handlebars = require('handlebars'),
    gulpsmith = require('gulpsmith'),
    frontMatter = require('gulp-front-matter'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    fileReplace = require('../plugins/file-replace'),
    assignPaths = require('../plugins/assign-paths'),
    collectionsTask,
    templatesTask,
    insertSnippets;
    
// Equals helper because Handlebars feels like it must be logicless :(
Handlebars.registerHelper('equals', function (a, b, options) {
    if (a === b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

collectionsTask = collections({
    pages: {
        pattern: '*.md',
        sortBy: 'index',
        refer: false
    }
});

templatesTask = templates({
    engine: 'handlebars',
    directory: './src/content/templates/',
    partials: {
        'github-link': 'partials/github-link',
        'google-analytics': 'partials/google-analytics',
        'header': 'partials/header',
        'navigation': 'partials/navigation',
        'scripts': 'partials/scripts'
    }
});

insertSnippets = fileReplace({
    pattern: './dist/bookmarklets/**/*.js',
});

module.exports = function defineTask(gulp) {

    return function transformContent() {
        return gulp.src('./src/content/*.*')
            // Parse the frontmatter and flatten the result object
            //  for use by metalsmith
            .pipe(frontMatter()).on('data', function(file) {
                _.assign(file, file.frontMatter); 
                delete file.frontMatter;
            })
            .pipe(
                // Order of operations is important here
                gulpsmith()
                    // Group the files so we can build navigation
                    .use(collectionsTask)
                    // Render each markdown file as HTML
                    .use(markdown())
                    // Insert Code Snippets
                    .use(insertSnippets)
                    // Permalinks jacks things up, so assign our own paths
                    .use(assignPaths())
                    // Encapsulate each markdown file in its template
                    .use(templatesTask)
            )
            .pipe(gulp.dest('./dist/site/'));
    };
    
};