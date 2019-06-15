// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tab) => {
    // No tabs or host permissions needed!
    console.log('Launching for ' + tab.url);
    chrome.tabs.sendMessage(tab.id, {
        type: 'LAUNCH_TOOLBOX'
    });
});