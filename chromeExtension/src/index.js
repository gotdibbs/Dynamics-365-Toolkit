import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Honeybadger from 'honeybadger-js';
import Package from '../package.json';

import { AppStateProvider } from './components/AppStateProvider';
import { ToggleProvider } from './components/ToggleProvider';
import Toolbox from './components/Toolbox';

Honeybadger.configure({
    apiKey: '3783205f',
    environment: 'production',
    revision: Package.version,
    onerror: false,
    onunhandledrejection: false
});

(function (f, a, t, h, o, m) {
    a[h] =
        a[h] ||
        function () {
            (a[h].q = a[h].q || []).push(arguments);
        };
    (o = f.createElement('script')), (m = f.getElementsByTagName('script')[0]);
    o.async = 1;
    o.src = t;
    o.id = 'fathom-script';
    m.parentNode.insertBefore(o, m);
})(document, window, 'https://cdn.usefathom.com/tracker.js', 'fathom');
fathom('set', 'siteId', 'HIILGHZZ');
fathom('trackPageview');

const Container = () => {
    const [isOpen, setIsOpen] = useState(true);

    function handleLaunchRequest(e) {
        if (e.detail.type === 'LAUNCH_TOOLBOX') {
            setIsOpen(true);
        }
    }

    useEffect(() => {
        document.addEventListener('gotdibbs-toolbox', handleLaunchRequest);

        return () => document.removeEventListener('gotdibbs-toolbox', handleLaunchRequest);
    }, []);

    return (
        <AppStateProvider>
            <ToggleProvider>{isOpen ? <Toolbox setIsOpen={setIsOpen} /> : null}</ToggleProvider>
        </AppStateProvider>
    );
};

const root = document.createElement('div');
root.dataset.hook = 'gotdibbs-toolbox-root';
document.body.appendChild(root);

ReactDOM.render(<Container />, root);
