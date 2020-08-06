import React, { useContext } from 'react';

import { AppStateContext } from './AppStateProvider';
import { ToggleContext } from './ToggleProvider';
import UtilitiesTabItem from './UtilitiesTabItem';
import * as Utilities from '../utilities';

export default function UtilitiesTab() {
    const appState = useContext(AppStateContext);
    const { setIsExpanded } = useContext(ToggleContext);

    if (!appState) {
        return;
    }

    return (
        <section data-page="utilities">
            <ul style={{ fontSize: '12px', listSTyleType: 'none' }}>
                {
                    Object.keys(Utilities).map(key => Utilities[key]).filter(utility => {
                        if (utility.maxVersion && utility.maxVersion < appState.majorVersion) {
                            return false;
                        }
                        else if (utility.minVersion && utility.minVersion > appState.majorVersion) {
                            return false;
                        }
                        else if (utility.requiresForm && !appState.isForm) {
                            return false;
                        }

                        return true;
                    }).map((utility, index) => (
                        <UtilitiesTabItem utility={utility}
                            key={index}
                            appState={appState}
                            setIsExpanded={setIsExpanded} />
                    ))
                }
            </ul>
        </section>
    );
}