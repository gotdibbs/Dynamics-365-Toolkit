try {
    // Prevent multiple instances
    if (document.querySelector('[data-hook="gotdibbs-toolbox"]')) {
        return;
    }

    function load(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();
        request.onload = function onload() {
            callback(this.response);
        };
    }

    function runScripts(element, html) {
        var scripts,
            scriptsLength;

        scripts = element.getElementsByTagName("script");
        for (var i = 0, scriptsLength = scripts.length; i < scriptsLength; i++) {
            if (scripts[i].src != '') {
                var tag = document.createElement('script');
                tag.src = scripts[i].src;
                document.getElementsByTagName('head')[0].appendChild(tag);
            }
            else {
                eval(scripts[i].innerHTML);
            }
        }
    }

    load('//www.gotdibbs.com/crm/help/launcher.fragment.html', function onRetrieved(html) {
        var root = document.createElement('div');
        root.innerHTML = html;
        root.setAttribute('data-hook', 'gotdibbs-toolbox-root');
        document.body.appendChild(root);
        runScripts(root);
    });
}
catch(er) {
    alert('Error occurred while opening the toolkit. ' + er.message);
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'launch-gotdibbs-toolkit',
        component: 'bookmarklets',
        context: { version: config.fullVersion }
    });
}