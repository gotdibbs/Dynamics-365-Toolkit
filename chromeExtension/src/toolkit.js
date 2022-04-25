import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Honeybadger from '@honeybadger-io/js';
import Package from '../package.json';
import { log } from './logger';

import { StoreProvider } from './components/StoreProvider';
import AnalyticsTracker from './components/AnalyticsTracker';
import Toolbox from './components/Toolbox';

import './styles/toolkit.css';
import './styles/modal.css';

Honeybadger.configure({
    apiKey: process.env.HONEYBADGER_API_KEY,
    environment: process.env.NODE_ENV,
    revision: Package.version,
    enableUncaught: false,
    enableUnhandledRejection: false
});

Honeybadger.beforeNotify((notice) => {
    // Silence all errors from 8.x
    if (/^8\./.test(notice?.context?.version)) { return false; }
});

log('Loaded');

const Container = () => {
    const [isOpen, setIsOpen] = useState(true);

    function handleLaunchRequest(e) {
        if (e.detail.type === 'LAUNCH_TOOLBOX') {
            setIsOpen(true);
        }
    }

    useEffect(() => {
        // Handles incoming requests from `launcher.js` to show the toolkit again after it's been closed
        document.addEventListener('gotdibbs-toolbox', handleLaunchRequest);

        // If we unmount, which we currently don't expect to, clean up listeners
        return () => document.removeEventListener('gotdibbs-toolbox', handleLaunchRequest);
    }, []);

    return (
        <AnalyticsTracker>
            <StoreProvider>
                { isOpen ? <Toolbox setIsOpen={setIsOpen} /> : null }
            </StoreProvider>
        </AnalyticsTracker>
    );
};

function load() {
    let root = document.querySelector('[data-hook="gotdibbs-toolbox-root"]');

    if (root) {
        // Unmount and remount instead of dispatching a message to refresh
        ReactDOM.unmountComponentAtNode(root);
    }
    else {
        root = document.createElement('div');
        root.dataset.hook = 'gotdibbs-toolbox-root';
        document.body.appendChild(root);
    }

    ReactDOM.render(<Container />, root);
}

function open() {
    let message = new CustomEvent('gotdibbs-toolbox', {
        detail: {
            type: 'LAUNCH_TOOLBOX'
        }
    });

    message.initEvent('gotdibbs-toolbox', false, false);

    document.dispatchEvent(message);
}

window.__GOTDIBBS_TOOLBOX__ = {
    load,
    open
};

load();