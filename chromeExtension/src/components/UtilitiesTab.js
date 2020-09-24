import React, { useContext } from 'react';

import { StoreContext } from './StoreProvider';
import UtilitiesTabItem from './UtilitiesTabItem';
import { default as Utilities } from '../utilities';

export default function UtilitiesTab() {
    const { state } = useContext(StoreContext);

    if (!state || !state.fullVersion) {
        return;
    }

    return (
        <section data-page="utilities">
            <ul style={{ listSTyleType: 'none' }}>
                {
                    Utilities.filter(utility => {
                        if (utility.maxVersion && utility.maxVersion < state.majorVersion) {
                            return false;
                        }
                        else if (utility.minVersion && utility.minVersion > state.majorVersion) {
                            return false;
                        }
                        else if (utility.requiresForm && !state.isForm) {
                            return false;
                        }

                        return true;
                    }).map(utility => (
                        <UtilitiesTabItem utility={utility}
                            key={utility.key} />
                    ))
                }
            </ul>
        </section>
    );
}