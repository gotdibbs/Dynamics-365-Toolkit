(function (global) {
    var _sourceHtml = null;

    function injectScript(file) {
        let scriptTag = document.createElement('script');

        scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.setAttribute('src', file);

        scriptTag.onload = () => {
            scriptTag.remove();
        };

        (document.head || document.documentElement).appendChild(scriptTag);
    }

    function loadToolbox() {
        let root = document.createElement('div');
        root.innerHTML = _sourceHtml;
        root.setAttribute('data-hook', 'gotdibbs-toolbox-root');
        document.body.appendChild(root);

        injectScript(chrome.extension.getURL('toolkit/launcher.js'));
    }

    function launchToolbox(version) {
        if (!version) {
            alert('It doesn\'t look like I can interact with this page. Sorry!');
            return;
        }


        if (document.querySelector('[data-hook="gotdibbs-toolbox"]')) {
            return;
        }

        if (!_sourceHtml) {
            fetch(chrome.extension.getURL('toolkit/launcher.fragment.html'))
                .then(r => {
                    if (!r.ok) {
                        throw Error(r.statusText);
                    }

                    return r.text();
                })
                .then(html => {
                    _sourceHtml = html;

                    loadToolbox();
                })
                .catch(e => {
                    console.error('Failed to load toolkit HTML');
                    console.error(e);
                });
        }
        else {
            loadToolbox();
        }
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
            case 'LAUNCH_TOOLBOX':
                launchToolbox(message.content);
                break;
        }
    }

    function validateVersion() {
        sendMessage('VALIDATE_VERSION');
    }

    function handleBackgroundMessage(e) {
        switch (e.type) {
            case 'LAUNCH_TOOLBOX':
                validateVersion();
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

    global.addEventListener('load', load);
}(this));