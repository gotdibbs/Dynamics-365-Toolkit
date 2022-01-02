import * as fs from 'fs';
import { getBrowsers } from './utilities/BrowserstackHelper.mjs';

// Load `process.env`
import * as dotenv from 'dotenv';
dotenv.config();

// Browserstack doesn't match webdriver's platforms anymore so here we are...
const OS_TO_PLATFORM_MAP = {
    'Windows': 'WINDOWS',
    'OS X': 'MAC'
};

// Request latest browser versions from browserstack
// Use these to define our capabilities
async function parseLatestBrowsers() {
    const latestBrowsers = await getBrowsers();

    if (!latestBrowsers || !latestBrowsers.length) {
        throw new Error('Could not retrieve latest browser versions');
    }

    const requestedBrowsers = [
        {
            os: 'Windows',
            browserName: 'chrome',
            browserVersion: 'beta'
        },
        {
            os: 'OS X',
            browserName: 'edge',
            browserVersion: 'beta',
            'bstack:options' : {}
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
            browserName: 'edge',
            browserVersion: 'latest',
            'bstack:options' : {}
        }
    ];

    requestedBrowsers.forEach(requestedBrowser => {
        const match = latestBrowsers.find(browser => {
            return browser.os === requestedBrowser.os &&
                browser.browser === requestedBrowser.browserName &&
                browser.browser_version != null &&
                browser.browser_version.match(requestedBrowser.browserVersion);
        });

        if (!match) {
            throw new Error('Could not locate a matching browser for: ' + JSON.stringify(requestedBrowser));
        }

        capabilities.push({
            ...requestedBrowser,
            browserVersion: match.browser_version
        });

        capabilities.map(c => {
            if (c.os) {
                c.platformName = OS_TO_PLATFORM_MAP[c.os];
            }
            delete c.os;
        });
    });

    fs.writeFileSync('./capabilities.json', JSON.stringify(capabilities, null, 4));
}

parseLatestBrowsers();