const { config } = require('./wdio.conf');

exports.config = {
    ...config,
    capabilities: [
        {
            browserName: 'chrome',
            browserVersion: 'latest'
        }
    ]
};
