import Package from '../package.json';

var _sourceHtml = null;

function injectScript(file, scriptType = 'text/javascript') {
    return new Promise((resolve, reject) => {
        let scriptTag = document.createElement('script');

        scriptTag.setAttribute('type', scriptType);
        scriptTag.setAttribute('src', file);

        scriptTag.onload = () => {
            scriptTag.remove();
            resolve();
        };

        scriptTag.onerror = reject;

        (document.head || document.documentElement).appendChild(scriptTag);
    });
}

async function injectToolbox() {
    return await injectScript(chrome.runtime.getURL('toolkit.js'), 'module');
}

function sendMessage(type, content) {
    let message = new CustomEvent('gotdibbs-toolbox', {
        detail: {
            type,
            content
        }
    });

    message.initEvent('gotdibbs-toolbox', false, false);

    document.dispatchEvent(message);
}

async function requestLaunchToolbox(version) {
    if (document.querySelector('[data-hook="gotdibbs-toolbox-root"]')) {
        sendMessage('LAUNCH_TOOLBOX');
        return;
    }

    try {
        injectToolbox();
    }
    catch (e) {
        console.error('Failed to load toolkit HTML');
        console.error(e);
        Honeybadger && Honeybadger.notify(e, {
            message: 'Failed to load toolkit HTML'
        });
    }
}

// Handles messages coming from the Chrome Extension Layer (background.js)
function handleBackgroundMessage(e) {
    switch (e.type) {
        case 'LAUNCH_TOOLBOX':
            requestLaunchToolbox();
            break;
    }
}

function attachListeners() {
    chrome.runtime.onMessage.addListener(handleBackgroundMessage);
}

function load() {
    // Handle errors that occur inside our sandbox
    Honeybadger.configure({
        apiKey: '3783205f',
        environment: 'production',
        revision: Package.version,
        onerror: false,
        onunhandledrejection: false
    });

    Honeybadger.setContext({
        source: 'chrome_extension'
    });

    try {
        attachListeners();

        requestLaunchToolbox();
    }
    catch (e) {
        Honeybadger.notify(e);

        throw e;
    }
}

// Tag that we've loaded the app for benefit of background.js
window.GOTDIBBS_LOADED = true;

if (document.readyState === 'complete') {
    load();
}
else {
    window.addEventListener('load', load);
}