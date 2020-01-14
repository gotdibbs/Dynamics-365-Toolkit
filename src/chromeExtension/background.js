// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.executeScript({ code: 'window.GOTDIBBS' }, (result) => {
        if (result[0]) {
            chrome.tabs.sendMessage(tab.id, {
                type: 'LAUNCH_TOOLBOX'
            });
        }
        else {
            chrome.tabs.insertCSS(tab.id, {
                file: 'toolkit/launcher.css'
            });
        
            chrome.tabs.executeScript(tab.id, {
                file: 'honeybadger.min.js'
            }, () => {
                chrome.tabs.executeScript(tab.id, {
                    file: 'app.js'
                });
            });
        }
    });
});