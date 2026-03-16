const { config } = require('./wdio.conf');

exports.config = {
    ...config,
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            browserVersion: 'latest'
        }
    ]
};
