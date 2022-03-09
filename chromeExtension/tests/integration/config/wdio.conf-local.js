const { config } = require('./wdio.conf');

exports.config = {
    ...config,
    logLevel: 'warn',
    specFileRetries: 0,
    maxInstances: 1,
    maxInstancesPerCapability: 1,
    services: [
        ['chromedriver', {}]
        //['browserstack', {}]
    ],
    bail: 1,
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            browserVersion: 'latest',
            'bstack:options': {}
        }
    ],
    // Uncomment the below to specify a specific feature file to run
    // specs: [
    //     './features/toolbox.feature'
    // ]
};