(function (global) {
    function setVersion(version) {
        if (!version) {
            chrome.runtime.sendMessage({
                type: 'Toggle',
                content: false
            });
        }
        else {
            chrome.runtime.sendMessage({
                type: 'Toggle',
                content: true
            });
        }
    }

    function injectScript(file) {
        let scriptTag = document.createElement('script');

        scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.setAttribute('src', file);

        scriptTag.onload = () => {
            scriptTag.remove();
        };

        (document.head || document.documentElement).appendChild(scriptTag);
    }

    function loadDependencies() {
        injectScript(chrome.extension.getURL('contextCommunicator.js'));
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

    function handleEvent(e) {
        let message = e.detail;

        switch (message.type) {
            case 'SET_VERSION':
                setVersion(message.content);
                break;
        }
    }

    function handleBackgroundMessage(e, sender) {
        switch (e.type) {
            case 'LAUNCH_TOOLBOX':
                sendMessage(e.type);
                break;
        }
    }

    function attachListeners() {
        document.addEventListener('gotdibbs-toolbox', handleEvent);

        chrome.runtime.onMessage.addListener(handleBackgroundMessage);
    }

    function load() {
        loadDependencies();
        attachListeners();
    }

    load();
}(this));