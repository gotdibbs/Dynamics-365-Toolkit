(function (global) {

    global.GotDibbs = global.GotDibbs || (function () {

        var _state;

        function getState(verbose) {
            try {
                if (global.APPLICATION_VERSION === '5.0') {
                    _state = {
                        context: window.top.frames[0],
                        version: global.APPLICATION_VERSION,
                        fullVersion: global.APPLICATION_VERSION
                    };
                }
                else if (/^[6,7,8]\.\d+$/.test(global.APPLICATION_VERSION)) {
                    var $iframe = $('#crmContentPanel iframe:not([style*=\'visibility: hidden\'])');
                    
                    if ($iframe.length > 0 && $iframe[0].contentWindow.Xrm) {
                        _state = {
                            context: $iframe[0].contentWindow,
                            version: global.APPLICATION_VERSION,
                            fullVersion: global.APPLICATION_VERSION
                        };
                    }
                    else {
                        verbose && console.log('[CRM 2013/2015/2016] Could not locate the entity form. Please ensure you\'re viewing a record in Dynamics CRM.');
                        return;
                    }
                }
                else if (global.Xrm && global.Xrm.Utility && global.Xrm.Utility.getGlobalContext &&
                    global.Xrm.Utility.getGlobalContext() && global.Xrm.Utility.getGlobalContext().getVersion &&
                    /^[9]\./.test(global.Xrm.Utility.getGlobalContext().getVersion())) {
                        _state = {
                            context: global,
                            version: global.Xrm.Utility.getGlobalContext().getVersion().slice(0, 3),
                            fullVersion: global.Xrm.Utility.getGlobalContext().getVersion()
                        };
                }
                else if (global.Xrm && global.Xrm.Utility && global.Xrm.Utility.getGlobalContext &&
                    global.Xrm.Utility.getGlobalContext() && global.Xrm.Utility.getGlobalContext().getVersion) {
                        Honeybadger.notify('Unsupported D365 Version Detected', { context: {
                            version: global.Xrm.Utility.getGlobalContext().getVersion()
                        } });
                        verbose && console.log([
                            'Unsupported CRM Version Detected: ', global.APPLICATION_VERSION, '.',
                            ' Please check for an updated version of this utility',
                            ' or email webmaster@gotdibbs.net and let us know that this version of CRM',
                            ' isn\'t working.'
                        ].join(''));
                        return;
                }
                /* Fall back to checking older versions quick to report it, but moving this check
                   before the D365 check will result in false positives on legacy forms */
                else if (global.APPLICATION_VERSION) {
                    Honeybadger.notify('Unsupported CRM Version Detected', { context: {
                        version: global.APPLICATION_VERSION
                    } });
                    verbose && console.log([
                        'Unsupported CRM Version Detected: ', global.APPLICATION_VERSION, '.',
                        ' Please check for an updated version of this utility',
                        ' or email webmaster@gotdibbs.net and let us know that this version of CRM',
                        ' isn\'t working.'
                    ].join(''));
                    return;
                }
                else {
                    // Notify honeybadger only if it looks like we might be in an actual CRM environment
                    if (/(dynamics|crm)/.test(document.location.href) &&
                        !/(operations\.dynamics|retail\.dynamics)/.test(document.location.href)) {
                        Honeybadger.notify('Failed to detect current CRM version', { context: {
                            xrm: !!global.Xrm,
                            xrmPage: !!(global.Xrm && global.Xrm.Page),
                            xrmUtility: !!(global.Xrm && global.Xrm.Utility)
                        } });
                    }
                    verbose && console.log('Unable to detect current CRM Version. Please ensure you\'re viewing a record that has finished loading in Dynamics CRM.');
                    return;
                }

                return _state;
            }
            catch (e) {
                Honeybadger.notify(e, {
                    message: 'Error encountered while attempting to detect environment state'
                });
            }
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

        function sendState() {
            _state = getState();

            sendMessage('INJECT_TOOLBOX', _state ? _state.version : null);
        }
    
        function handleEvent(e) {
            let message = e.detail;
    
            switch (message.type) {
                case 'VALIDATE_VERSION':
                    sendState();
                    break;
            }
        }
    
        function attachListeners() {
            document.addEventListener('gotdibbs-toolbox', handleEvent);
        }
    
        function load() {
            attachListeners();
        }

        return {
            load,
            getState
        };

    }());

    global.GotDibbs.load();

    Honeybadger.configure({
        apiKey: '3783205f',
        environment: 'production',
        revision: '1.12',
        onerror: false,
        onunhandledrejection: false
    });

    Honeybadger.setContext({
        source: 'chrome_extension_content'
    });

}(this));