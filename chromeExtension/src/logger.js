import SumoLogger from 'sumo-logger';

let logger = null;

export function log(message) {
    if (process.env.DISABLE_LOGGING == 'true' ||
        process.env.NODE_ENV === 'development' ||
        !process.env.SUMO_LOGIC_COLLECTOR) {
        return console.log(arguments);
    }
    else if (!logger) {
        logger = new SumoLogger({
            endpoint: process.env.SUMO_LOGIC_COLLECTOR
        });
    }

    let detailedMessage = {
        ua: navigator.userAgent,
        url: window.location.hostname
    };

    if (typeof(message) !== 'object') {
        detailedMessage.msg = message;
    }
    else {
        detailedMessage = {
            ...detailedMessage,
            ...message
        };
    }

    return logger.log(detailedMessage);
}