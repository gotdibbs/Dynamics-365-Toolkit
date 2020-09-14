const { config } = require('./wdio.conf');

exports.config = {
    ...config,
    logLevel: 'warn',
    specFileRetries: 0,
    services: [
        ['chromedriver', {}]
        //['browserstack', {}]
    ],
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            browserVersion: 'latest',
        }
    ],
    // Uncomment the below to specify a specific feature file to run
    // specs: [
    //     './features/utilities.feature'
    // ]
};