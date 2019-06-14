// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tab) => {
    // No tabs or host permissions needed!
    console.log('Launching for ' + tab.url);
    chrome.tabs.sendMessage(tab.id, {
        type: 'LAUNCH_TOOLBOX'
    });
});

chrome.runtime.onMessage.addListener((message, sender) => {
    switch (message.type) {
        case 'Toggle':
            toggle(message.content, sender.tab.id);
            break;
    }
});

function toggle(isEnabled, tabId) {
    isEnabled ? chrome.browserAction.enable(tabId) :
        chrome.browserAction.disable(tabId);
}