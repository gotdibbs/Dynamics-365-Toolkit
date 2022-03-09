import * as Fathom from 'fathom-client';
import Honeybadger from '@honeybadger-io/js';

function confirmReload() {
    if (window.confirm('We were unable to auto-enable the command checker, so we need to refresh the page then the ribbon debugger should be available. Cool?')) {
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
        actions.toggleExpanded();

        actions.alert(true, 'The Command Checker is already enabled. Look for it under the ellipsized area of the command bar if you have trouble locating it.');
        return;
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

            actions.toggleExpanded();
            actions.alert(true, 'Enabled the Command Checker. You should find it in the command bar now.');
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
    title: 'Enable Command Checker',
    description: 'Enables the Command Checker to Debug Ribbon Buttons for the current entity.',
    requiresForm: false,
    retryCount: 0,
    minVersion: 9
};