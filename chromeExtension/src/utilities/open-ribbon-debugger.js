import * as Fathom from 'fathom-client';
import Honeybadger from 'honeybadger-js';

function launchRibbonDebug(toggleExpanded, retries = 0) {
    let button = document.getElementById('CommandChecker') ||
        document.querySelector('button[data-id="CommandChecker"]')?.parentNode;

    if (!button && retries >= 5) {
        Honeybadger.notify({
            message: 'Could not locate the command checker ribbon button'
        });

        return alert('Sorry! Could not find the button for you, but it should be on the page somewhere...');
    }
    else if (!button) {
        return setTimeout(() => launchRibbonDebug(toggleExpanded, ++retries), 1000);
    }

    button.click();
    document.body.focus();
    // Get out the way
    toggleExpanded();

    Fathom.trackGoal('ASIUFPXT', 0);
}

function confirmReload() {
    if (window.confirm('We were unable to auto-launch the ribbon debugger, so we need to refresh the page then the ribbon debugger should be available. Cool?')) {
        window.location.href = window.location.href + '&ribbondebug=true';
        Fathom.trackGoal('T5LLXM4X', 0);
    }
    else {
        // Track cancel
        Fathom.trackGoal('SZGWWMPT', 0);
    }
}

function openRibbonDebugger(state, actions) {
    if (window.location.search.match(/ribbondebug/)) {
        return launchRibbonDebug(actions.toggleExpanded);
    }

    try {
        // Try to update the store
        let storeName = Object.keys(window).find(k => k?.startsWith('__store$'));

        if (!storeName) {
            confirmReload();
            return;
        }

        let store = window[storeName];

        if (!store?.getState || !store.getState()) {
            throw new Error('Store does not appear to have the right structure');
        }

        let state = store.getState();

        if (!state?.configuration) {
            throw new Error('Store does not appear to have the `configuration.ribbonDebug` key');
        }

        Honeybadger.addBreadcrumb('Accessed store with appropriate shape');

        let ribbonDebugPreviousState = state.configuration.ribbonDebug;

        store.dispatch({ type: 'initialize.configuration.from.url', payload: { ribbonDebug: true } });

        Honeybadger.addBreadcrumb('Dispatched');

        setTimeout(() => {
            // Give UI time to repaint
            state = store.getState();

            if (ribbonDebugPreviousState !== true && ribbonDebugPreviousState === state.configuration.ribbonDebug) {
                throw new Error('Dispatch failed to update relevant store key');
            }

            launchRibbonDebug(actions.toggleExpanded);
        }, 1);
    }
    catch (e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while attempting to open the ribbon debugger'
        });

        confirmReload();
    }
}

export default {
    action: openRibbonDebugger,
    key: 'open-ribbon-debugger',
    title: 'Open Ribbon Debugger',
    description: 'Opens the Command Checker to Debug Ribbon Buttons for the current entity.',
    requiresForm: false,
    retryCount: 0,
    minVersion: 9
};