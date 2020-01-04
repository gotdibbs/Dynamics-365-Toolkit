(function (global) {

    global.GotDibbs = global.GotDibbs || (function () {

        var _state;

        function getState(verbose) {
            if (global.APPLICATION_VERSION === '5.0') {
                _state = { context: window.top.frames[0], version: global.APPLICATION_VERSION };
            }
            else if (/^[6,7,8,9]\.\d+$/.test(global.APPLICATION_VERSION)) {
                var $iframe = $('#crmContentPanel iframe:not([style*=\'visibility: hidden\'])');
                
                if ($iframe.length > 0 && $iframe[0].contentWindow.Xrm) {
                    _state = { context: $iframe[0].contentWindow, version: global.APPLICATION_VERSION };
                }
                else {
                    verbose && console.log('[CRM 2013/2015/2016] Could not locate the entity form. Please ensure you\'re viewing a record in Dynamics CRM.');
                    return;
                }
            }
            else if (global.APPLICATION_VERSION) {
                verbose && console.log([
                    'Unsupported CRM Version Detected: ', global.APPLICATION_VERSION, '.',
                    ' Please check for an updated version of this utility',
                    ' or email webmaster@gotdibbs.net and let us know that this version of CRM',
                    ' isn\'t working.'
                ].join(''));
                return;
            }
            else if (global.Xrm && global.Xrm.Utility && global.Xrm.Utility.getGlobalContext &&
                global.Xrm.Utility.getGlobalContext() && global.Xrm.Utility.getGlobalContext().getVersion &&
                /^[9]\./.test(global.Xrm.Utility.getGlobalContext().getVersion())) {
                    _state = { context: global, version: global.Xrm.Utility.getGlobalContext().getVersion().slice(0, 3) };
            }
            else {
                verbose && console.log('Unable to detect current CRM Version. Please ensure you\'re viewing a record in Dynamics CRM.');
                return;
            }

            return _state;
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

            sendMessage('LAUNCH_TOOLBOX', _state ? _state.version : null);
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
}(this));