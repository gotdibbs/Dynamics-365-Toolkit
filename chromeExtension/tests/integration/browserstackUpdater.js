const helpers = require('./utilities/BrowserstackHelper');

// Load `process.env`
require('dotenv').config();

async function parseLatestBrowsers() {
    const latestBrowsers = await helpers.getBrowsers();

    if (!latestBrowsers || !latestBrowsers.length) {
        throw new Error('Could not retrieve latest browser versions');
    }

    const requestedBrowsers = [
        {
            os: 'Windows',
            browser: 'chrome',
            version: 'dev'
        },
        {
            os: 'Mac',
            browser: 'chrome',
            version: 'dev'
        },
        {
            os: 'Windows',
            browser: 'Edge',
            version: 'dev',
            extensions: {
                'bstack:options' : {}
            }
        },
        {
            os: 'Mac',
            browser: 'Edge',
            version: 'dev',
            extensions: {
                'bstack:options' : {}
            }
        }
    ];

    const defaults = {
        maxInstances: 1
    };

    let capabilities = [
        {
            ...defaults,
            browserName: 'chrome',
            browserVersion: 'latest',
        },
        {
            ...defaults,
            browserName: 'Edge',
            browserVersion: 'latest',
            'bstack:options' : {}
        }
    ];

    requestedBrowsers.forEach(requestedBrowser => {
        const match = latestBrowsers.find(browser => {
            return browser.os === requestedBrowser.os &&
                browser.browser === requestedBrowser.browser &&
                browser.browser_version != null &&
                browser.browser_version.match(requestedBrowser.version);
        });

        if (!match) {
            throw new Error('Could not locate a matching browser for: ' + JSON.stringify(requestedBrowser));
        }

        capabilities.push(match);
    });

    console.log(capabilities);
}

return parseLatestBrowsers();