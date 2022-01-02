function getLoaded() {
    return window.GOTDIBBS_LOADED;
}

// Called when the user clicks on the browser action.
chrome.action.onClicked.addListener((tab) => {
    const defaultEventProps = {
        target: { tabId: tab.id }
    };

    chrome.scripting.executeScript({
        ...defaultEventProps,
        func: getLoaded
    }, (result) => {
        if (result[0].result) {
            chrome.tabs.sendMessage(tab.id, {
                type: 'LAUNCH_TOOLBOX'
            });
        }
        else {
            // Preload CSS
            chrome.scripting.insertCSS({
                ...defaultEventProps,
                files: ['toolkit.css']
            });

            chrome.scripting.executeScript({
                ...defaultEventProps,
                files: ['honeybadger.min.js']
            }, () => {
                chrome.scripting.executeScript({
                    ...defaultEventProps,
                    files: ['launcher.js']
                });
            });
        }
    });
});