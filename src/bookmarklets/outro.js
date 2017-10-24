}(function (global) {
    if (global.APPLICATION_VERSION === '5.0') {
        return { context: window.top.frames[0], version: global.APPLICATION_VERSION };
    }
    else if (/^[6,7,8,9]\.\d+$/.test(global.APPLICATION_VERSION)) {
        var $iframe = $('#crmContentPanel iframe:not([style*=\'visibility: hidden\'])');
        
        if ($iframe.length > 0 && $iframe[0].contentWindow.Xrm.Page.ui) {
            return { context: $iframe[0].contentWindow, version: global.APPLICATION_VERSION };
        }
        else {
            return alert('[CRM 2013/2015/2016] Could not locate the entity form. Please ensure you\'re viewing a record in Dynamics CRM.');
        }
    }
    else if (global.APPLICATION_VERSION) {
        return alert([
            'Unsupported CRM Version Detected: ', global.APPLICATION_VERSION, '.',
            ' Please check https://gotdibbs.com/crm/help/ for an updated version of this bookmarklet',
            ' or email webmaster@gotdibbs.net and let us know that this version of CRM',
            ' isn\'t working.'
        ].join(''));
    }
    else if (global.Xrm && global.Xrm.Utility && global.Xrm.Utility.getGlobalContext &&
        global.Xrm.Utility.getGlobalContext() && global.Xrm.Utility.getGlobalContext().getVersion &&
        /^[9]\./.test(global.Xrm.Utility.getGlobalContext().getVersion())) {
        return { context: global, version: global.Xrm.Utility.getGlobalContext().getVersion().slice(0, 3) };
    }
    else {
        return alert('Unable to detect current CRM Version. Please ensure you\'re viewing a record in Dynamics CRM.');
    }
}(window)));