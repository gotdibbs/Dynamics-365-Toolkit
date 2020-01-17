}(function (global) {
    if (global.APPLICATION_VERSION === '5.0') {
        return {
            context: window.top.frames[0],
            version: global.APPLICATION_VERSION,
            fullVersion: global.APPLICATION_VERSION };
    }
    else if (/^[6,7,8]\.\d+$/.test(global.APPLICATION_VERSION)) {
        var $iframe = $('#crmContentPanel iframe:not([style*=\'visibility: hidden\'])');
        
        if ($iframe.length > 0 && $iframe[0].contentWindow.Xrm.Page.ui) {
            return {
                context: $iframe[0].contentWindow,
                version: global.APPLICATION_VERSION,
                fullVersion: global.APPLICATION_VERSION
            };
        }
        else {
            return alert('[CRM 2013/2015/2016] Could not locate the entity form. Please ensure you\'re viewing a record that has finished loading in Dynamics CRM.');
        }
    }
    else if (global.Xrm && global.Xrm.Utility && global.Xrm.Utility.getGlobalContext &&
        global.Xrm.Utility.getGlobalContext() && global.Xrm.Utility.getGlobalContext().getVersion &&
        /^[9]\./.test(global.Xrm.Utility.getGlobalContext().getVersion())) {
        return {
            context: global,
            version: global.Xrm.Utility.getGlobalContext().getVersion().slice(0, 3),
            fullVersion: global.Xrm.Utility.getGlobalContext().getVersion()
        };
    }
    else if (global.Xrm && global.Xrm.Utility && global.Xrm.Utility.getGlobalContext &&
        global.Xrm.Utility.getGlobalContext() && global.Xrm.Utility.getGlobalContext().getVersion()) {
        Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
            message: 'Unsupported D365 Version Detected',
            action: 'outro',
            component: 'bookmarklets',
            context: { version: global.Xrm.Utility.getGlobalContext().getVersion() }
        });
        return alert([
            'Unsupported CRM Version Detected: ', global.APPLICATION_VERSION, '.',
            ' Please check https://gotdibbs.com/crm/help/ for an updated version of this bookmarklet',
            ' or email webmaster@gotdibbs.net and let us know that this version of CRM',
            ' isn\'t working.'
        ].join(''));
    }
    /* Fall back to checking older versions quick to report it, but moving this check
       before the D365 check will result in false positives on legacy forms */
    else if (global.APPLICATION_VERSION) {
        Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
            message: 'Unsupported CRM Version Detected',
            action: 'outro',
            component: 'bookmarklets',
            context: { version: global.APPLICATION_VERSION }
        });
        return alert([
            'Unsupported CRM Version Detected: ', global.APPLICATION_VERSION, '.',
            ' Please check https://gotdibbs.com/crm/help/ for an updated version of this bookmarklet',
            ' or email webmaster@gotdibbs.net and let us know that this version of CRM',
            ' isn\'t working.'
        ].join(''));
    }
    else {
        Honeybadger && Honeybadger.notify && Honeybadger.notify('Failed to detect current CRM version', { context: {
            xrm: !!global.Xrm,
            xrmPage: !!global.Xrm.Page,
            xrmUtility: !!global.Xrm.Utility
        } });
        return alert('Unable to detect current CRM Version. Please ensure you\'re viewing a record that has finished loading inside Dynamics CRM.');
    }
}(window)));