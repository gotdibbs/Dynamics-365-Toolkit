import fetch from 'node-fetch';

function getAuthenticationToken() {
    const token = process.env.BROWSERSTACK_USER + ':' + process.env.BROWSERSTACK_ACCESSKEY;

    return 'Basic ' + Buffer.from(token).toString('base64');
}

async function getBrowsers() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: getAuthenticationToken()
        }
    };

    const response = await fetch('https://api.browserstack.com/automate/browsers', options);

    return await response.json();
}

export {
    getBrowsers
};