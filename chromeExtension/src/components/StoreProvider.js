import React, {
    createContext,
    useEffect,
    useReducer,
    useRef
} from 'react';
import Honeybadger from 'honeybadger-js';

import { log } from '../logger';
import { reducer, initialState } from '../store/reducer';
import { useActions } from '../store/actions';

const StoreContext = createContext(initialState);

const defaultDynamicsState = {
    isLoaded: false,
    fullVersion: '0.0.0.0',
    isForm: false,
    recordId: null,
    logicalName: null
};

const ignoreErrorPatterns = [
    /crm4\.dynamics\.com/i,
    /sfa\/workflow/i,
    /tools\/diagnostics/i
];

function isIgnored(url) {
    for (let i = 0, len = ignoreErrorPatterns.length; i < len; i++) {
        if (ignoreErrorPatterns[i].test(url)) {
            return true;
        }
    }
}

function getDynamicsContext() {
    let result = {
        dynamicsState: null,
        context: null
    };

    try {
        if (global.APPLICATION_VERSION === '5.0') {
            result.context = window.top.frames[0];
            result.dynamicsState = {
                version: global.APPLICATION_VERSION,
                fullVersion: global.APPLICATION_VERSION
            };
        }
        else if (/^[6,7,8]\.\d+$/.test(global.APPLICATION_VERSION)) {
            var $iframe = $('#crmContentPanel iframe:not([style*=\'visibility: hidden\'])');

            if ($iframe.length > 0 && $iframe[0].contentWindow.Xrm) {
                result.context = $iframe[0].contentWindow;
                result.dynamicsState = {
                    version: global.APPLICATION_VERSION,
                    fullVersion: global.APPLICATION_VERSION
                };
            }
            else {
                console.log('[GotDibbs Toolbox for CRM 2013/2015/2016] Could not locate the entity form.');
                return result;
            }
        }
        else if (global.Xrm && global.Xrm.Utility && global.Xrm.Utility.getGlobalContext &&
            global.Xrm.Utility.getGlobalContext() && global.Xrm.Utility.getGlobalContext().getVersion &&
            /^[9]\./.test(global.Xrm.Utility.getGlobalContext().getVersion())) {
            result.context = global;
            result.dynamicsState = {
                version: global.Xrm.Utility.getGlobalContext().getVersion().slice(0, 3),
                fullVersion: global.Xrm.Utility.getGlobalContext().getVersion()
            };
        }
        else if (global.Xrm && global.Xrm.Utility && global.Xrm.Utility.getGlobalContext &&
            global.Xrm.Utility.getGlobalContext() && global.Xrm.Utility.getGlobalContext().getVersion) {
            Honeybadger.notify('Unsupported D365 Version Detected', { context: {
                version: global.Xrm.Utility.getGlobalContext().getVersion()
            } });
            console.log([
                '[GotDibbs Toolbox for D365] ',
                'Unsupported CRM Version Detected: ', global.APPLICATION_VERSION, '.',
                ' Please check for an updated version of this utility',
                ' or email webmaster@gotdibbs.net and let us know that this version of CRM',
                ' isn\'t working.'
            ].join(''));
            return result;
        }
        /* Fall back to checking older versions quick to report it, but moving this check
           before the D365 check will result in false positives on legacy forms */
        else if (global.APPLICATION_VERSION) {
            Honeybadger.notify('Unsupported CRM Version Detected', { context: {
                version: global.APPLICATION_VERSION
            } });
            console.log([
                '[GotDibbs Toolbox] ',
                'Unsupported Version Detected: ', global.APPLICATION_VERSION, '.',
                ' Please check for an updated version of this utility',
                ' or email webmaster@gotdibbs.net and let us know that this version of CRM',
                ' isn\'t working.'
            ].join(''));
            return result;
        }
        else {
            // Notify honeybadger only if its in crm.dynamics.com to reduce HB alerts
            if (/(crm\.dynamics\.com)/.test(document.location.href) &&
                !isIgnored(document.location.href)) {
                Honeybadger.notify('Failed to detect current CRM version', { context: {
                    xrm: !!global.Xrm,
                    xrmPage: !!(global.Xrm && global.Xrm.Page),
                    xrmUtility: !!(global.Xrm && global.Xrm.Utility)
                } });
            }
            console.log('[GotDibbs Toolbox] Unable to detect current CRM Version.');
            return result;
        }

        return result;
    }
    catch (e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while attempting to detect environment state'
        });
    }
}

function getDynamicsState() {
    try {
        const { dynamicsState, context } = getDynamicsContext();

        if (!dynamicsState) {
            return { dynamicsState, context };
        }

        Honeybadger.setContext({
            source: 'chrome_extension_content',
            version: dynamicsState && dynamicsState.fullVersion
        });

        const isForm = (context && context.Xrm &&
            context.Xrm.Page && context.Xrm.Page.ui &&
            context.Xrm.Page.data && context.Xrm.Page.data.entity);

        let recordId,
            logicalName;

        if (isForm) {
            const xrm = context.Xrm;

            try {
                logicalName = xrm.Page.data.entity.getEntityName && xrm.Page.data.entity.getEntityName();
            }
            catch(e) {
                // Swallow intermittent errors
                if (dynamicsState && dynamicsState.version < 9) { return; }

                Honeybadger.notify(e, 'Failed to retrieve record logical name while updating state');
            }

            try {
                recordId = xrm.Page.data.entity.getId && xrm.Page.data.entity.getId();
            }
            catch (e) {
                // Swallow intermittent errors
                if (dynamicsState && dynamicsState.version < 9) { return; }

                Honeybadger.notify(e, 'Failed to retrieve record ID while updating state');
            }
        }

        const majorVersion = dynamicsState.version ?
            parseInt(dynamicsState.version.split('.')[0], 10) : 0;

        return {
            context,
            dynamicsState: {
                isLoaded: true,
                isForm,
                recordId,
                logicalName,
                majorVersion,
                ...dynamicsState
            }
        };
    }
    catch (e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while determining isForm'
        });
    }
}

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = useActions(state, dispatch);

    const previousDynamicsState = useRef(defaultDynamicsState);

    useEffect(() => {
        let interval = setInterval(() => {
            let { dynamicsState, context } = getDynamicsState();

            if (!dynamicsState) {
                return;
            }

            if (dynamicsState.fullVersion != previousDynamicsState.current.fullVersion ||
                dynamicsState.isForm != previousDynamicsState.current.isForm ||
                dynamicsState.recordId != previousDynamicsState.current.recordId ||
                dynamicsState.logicalName != previousDynamicsState.current.logicalName) {

                // Log the version
                if (!previousDynamicsState.current.isLoaded && dynamicsState.fullVersion) {
                    log(dynamicsState.fullVersion);
                }

                // Don't serialize the context (where `Xrm` lives)
                // But DO cache it somewhere so it is easily accessible for debugging
                window.__GOTDIBBS_TOOLBOX__.context = context;

                // Only update the state if a key value has changed
                actions.setDynamicsState(dynamicsState);
                previousDynamicsState.current = dynamicsState;
            }

        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <StoreContext.Provider value={{ state, dispatch, actions }}>
            {children}
        </StoreContext.Provider>
    );
};

export {
    StoreContext,
    StoreProvider
};