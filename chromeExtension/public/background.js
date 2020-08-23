// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.executeScript({ code: 'window.GOTDIBBS_LOADED' }, (result) => {
        if (result[0]) {
            chrome.tabs.sendMessage(tab.id, {
                type: 'LAUNCH_TOOLBOX'
            });
        }
        else {
            // Preload CSS
            chrome.tabs.insertCSS(tab.id, {
                file: 'toolkit.css'
            });

            chrome.tabs.executeScript(tab.id, {
                file: 'honeybadger.min.js'
            }, () => {
                chrome.tabs.executeScript(tab.id, {
                    file: 'launcher.js'
                });
            });
        }
    });
});