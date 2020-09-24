import React, {
    createContext,
    useEffect,
    useState,
    useRef
} from 'react';
import Honeybadger from 'honeybadger-js';

const AppStateContext = createContext();
const { Provider } = AppStateContext;

const defaultState = {
    fullVersion: '0.0.0.0',
    isForm: false,
    recordId: null,
    logicalName: null
};

function getDynamicsState() {
    let state = null;

    try {
        if (global.APPLICATION_VERSION === '5.0') {
            state = {
                context: window.top.frames[0],
                version: global.APPLICATION_VERSION,
                fullVersion: global.APPLICATION_VERSION
            };
        }
        else if (/^[6,7,8]\.\d+$/.test(global.APPLICATION_VERSION)) {
            var $iframe = $('#crmContentPanel iframe:not([style*=\'visibility: hidden\'])');

            if ($iframe.length > 0 && $iframe[0].contentWindow.Xrm) {
                state = {
                    context: $iframe[0].contentWindow,
                    version: global.APPLICATION_VERSION,
                    fullVersion: global.APPLICATION_VERSION
                };
            }
            else {
                console.log('[GotDibbs Toolbox for CRM 2013/2015/2016] Could not locate the entity form.');
                return;
            }
        }
        else if (global.Xrm && global.Xrm.Utility && global.Xrm.Utility.getGlobalContext &&
            global.Xrm.Utility.getGlobalContext() && global.Xrm.Utility.getGlobalContext().getVersion &&
            /^[9]\./.test(global.Xrm.Utility.getGlobalContext().getVersion())) {
            state = {
                context: global,
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
            return;
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
            return;
        }
        else {
            // Notify honeybadger only if it looks like we might be in an actual CRM environment
            if (/(dynamics|crm)/.test(document.location.href) &&
                !/(operations|retail|ax|home)\.dynamics/.test(document.location.href)) {
                Honeybadger.notify('Failed to detect current CRM version', { context: {
                    xrm: !!global.Xrm,
                    xrmPage: !!(global.Xrm && global.Xrm.Page),
                    xrmUtility: !!(global.Xrm && global.Xrm.Utility)
                } });
            }
            console.log('[GotDibbs Toolbox] Unable to detect current CRM Version.');
            return;
        }

        return state;
    }
    catch (e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while attempting to detect environment state'
        });
    }
}

function getAppState() {
    try {
        const dynamicsState = getDynamicsState();

        if (!dynamicsState) {
            return;
        }

        Honeybadger.setContext({
            source: 'chrome_extension_content',
            version: dynamicsState && dynamicsState.fullVersion
        });

        const majorVersion = dynamicsState.version ?
            parseInt(dynamicsState.version.split('.')[0], 10) : 0;

        const isForm = (dynamicsState.context && dynamicsState.context.Xrm &&
            dynamicsState.context.Xrm.Page &&
            dynamicsState.context.Xrm.Page.ui && dynamicsState.context.Xrm.Page.data &&
            dynamicsState.context.Xrm.Page.data.entity);

        let recordId,
            logicalName;

        if (isForm) {
            const xrm = dynamicsState.context.Xrm;

            logicalName = xrm.Page.data.entity.getEntityName && xrm.Page.data.entity.getEntityName();

            try {
                recordId = xrm.Page.data.entity.getId && xrm.Page.data.entity.getId();
            }
            catch (e) {
                if (majorVersion < 9) {
                    // Swallow intermittent errors
                    return defaultState;
                }

                Honeybadger.notify(e, 'Failed to retrieve record ID while updating information panel');
            }
        }

        return {
            isForm,
            recordId,
            logicalName,
            majorVersion,
            ...dynamicsState
        };
    }
    catch (e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while determining isForm'
        });
    }
}

const AppStateProvider = ({ children }) => {
    const [appState, setAppState] = useState();
    const previousAppState = useRef(defaultState);

    useEffect(() => {
        let interval = setInterval(() => {
            let newState = getAppState();

            if (newState.fullVersion != previousAppState.current.fullVersion ||
                newState.isForm != previousAppState.current.isForm ||
                newState.recordId != previousAppState.current.recordId ||
                newState.logicalName != previousAppState.current.logicalName) {

                // Only update the state if a key value has changed
                setAppState(newState);
                previousAppState.current = newState;
            }

        }, 500);

        return () => clearInterval(interval);
    }, []);

    return <Provider value={ appState }>{children}</Provider>;
}

export {
    AppStateContext,
    AppStateProvider
};