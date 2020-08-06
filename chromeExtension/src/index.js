import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Honeybadger from 'honeybadger-js';
import Package from '../package.json';

import { AppStateProvider } from './components/AppStateProvider';
import { ToggleProvider } from './components/ToggleProvider';
import AnalyticsTracker from './components/AnalyticsTracker';
import Toolbox from './components/Toolbox';

import './styles/toolkit.css';

Honeybadger.configure({
    apiKey: process.env.HONEYBADGER_API_KEY,
    environment: process.env.NODE_ENV,
    revision: Package.version,
    onerror: false,
    onunhandledrejection: false
});

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
            <AppStateProvider>
                <ToggleProvider>{isOpen ? <Toolbox setIsOpen={setIsOpen} /> : null}</ToggleProvider>
            </AppStateProvider>
        </AnalyticsTracker>
    );
};

const root = document.createElement('div');
root.dataset.hook = 'gotdibbs-toolbox-root';
document.body.appendChild(root);

ReactDOM.render(<Container />, root);
