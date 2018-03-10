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

function getVersion() {
    window.top.document.location.href = 'javascript:%28function%28config%29%7Bfunction load%28t%2Ce%29%7Bvar n%3Dnew XMLHttpRequest%3Bn.open%28"GET"%2Ct%29%2Cn.send%28%29%2Cn.onload%3Dfunction%28%29%7Be%28this.response%29%7D%7Dfunction runScripts%28element%2Chtml%29%7Bvar scripts%2CscriptsLength%3Bscripts%3Delement.getElementsByTagName%28"script"%29%3Bfor%28var i%3D0%2CscriptsLength%3Dscripts.length%3Bi<scriptsLength%3Bi++%29if%28""%21%3Dscripts%5Bi%5D.src%29%7Bvar tag%3Ddocument.createElement%28"script"%29%3Btag.src%3Dscripts%5Bi%5D.src%2Cdocument.getElementsByTagName%28"head"%29%5B0%5D.appendChild%28tag%29%7Delse eval%28scripts%5Bi%5D.innerHTML%29%7Dif%28config%26%26config.context%29%7Bvar formContext%3Dconfig.context%3Btry%7Bif%28document.querySelector%28%27%5Bdata-hook%3D"gotdibbs-toolbox"%5D%27%29%29return%3Bload%28"//www.gotdibbs.com/crm/help/launcher.fragment.html"%2Cfunction%28t%29%7Bvar e%3Ddocument.createElement%28"div"%29%3Be.innerHTML%3Dt%2Ce.setAttribute%28"data-hook"%2C"gotdibbs-toolbox-root"%29%2Cdocument.body.appendChild%28e%29%2CrunScripts%28e%29%7D%29%7Dcatch%28er%29%7Balert%28"Error occurred while opening the toolkit. "+er.message%29%7D%7D%7D%29%28function%28t%29%7Bif%28"5.0"%3D%3D%3Dt.APPLICATION_VERSION%29return%7Bcontext%3Awindow.top.frames%5B0%5D%2Cversion%3At.APPLICATION_VERSION%7D%3Bif%28/%5E%5B6%2C7%2C8%2C9%5D%5C.%5Cd+%24/.test%28t.APPLICATION_VERSION%29%29%7Bvar e%3D%24%28"%23crmContentPanel iframe%3Anot%28%5Bstyle*%3D%27visibility%3A hidden%27%5D%29"%29%3Breturn e.length>0%26%26e%5B0%5D.contentWindow.Xrm.Page.ui%3F%7Bcontext%3Ae%5B0%5D.contentWindow%2Cversion%3At.APPLICATION_VERSION%7D%3Aalert%28"%5BCRM 2013/2015/2016%5D Could not locate the entity form. Please ensure you%27re viewing a record in Dynamics CRM."%29%7Dreturn t.APPLICATION_VERSION%3Falert%28%5B"Unsupported CRM Version Detected%3A "%2Ct.APPLICATION_VERSION%2C"."%2C" Please check https%3A//gotdibbs.com/crm/help/ for an updated version of this bookmarklet"%2C" or email webmaster@gotdibbs.net and let us know that this version of CRM"%2C" isn%27t working."%5D.join%28""%29%29%3At.Xrm%26%26t.Xrm.Utility%26%26t.Xrm.Utility.getGlobalContext%26%26t.Xrm.Utility.getGlobalContext%28%29%26%26t.Xrm.Utility.getGlobalContext%28%29.getVersion%26%26/%5E%5B9%5D%5C./.test%28t.Xrm.Utility.getGlobalContext%28%29.getVersion%28%29%29%3F%7Bcontext%3At%2Cversion%3At.Xrm.Utility.getGlobalContext%28%29.getVersion%28%29.slice%280%2C3%29%7D%3Aalert%28"Unable to detect current CRM Version. Please ensure you%27re viewing a record in Dynamics CRM."%29%7D%28window%29%29%3B';
}