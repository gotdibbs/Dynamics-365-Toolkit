import React, { useContext } from 'react';

import { AppStateContext } from './AppStateProvider';
import InfoTabItem from './InfoTabItem';
import * as InfoCollectors from '../infoCollectors';
import QuickAction from './QuickAction';
import * as QuickActions from '../utilities/quick-actions';

export default function InfoTab() {
    const appState = useContext(AppStateContext);

    if (!appState) {
        return null;
    }

    return (
        <section data-page="info" className="gotdibbs-toolbox-info" data-hook="gotdibbs-toolbox-info">
            <div>
                {
                    Object.keys(InfoCollectors).map(key => InfoCollectors[key]).filter(collector => {
                        return collector.isVisible === true ||
                            collector.isVisible(appState);
                    }).map((collector, index) => (
                        <InfoTabItem collector={collector} key={index} appState={appState} />
                    ))
                }
            </div>

            <fieldset className="gotdibbs-toolbox-quickactions" data-hook="gotdibbs-toolbox-quickactions">
                <legend>Quick Actions</legend>
                {
                    Object.keys(QuickActions).map(key => QuickActions[key]).filter(utility => {
                        if (utility.requiresForm && !appState.isForm) {
                            alert(utility.key);
                            return false;
                        }

                        return true;
                    }).map(utility => (
                        <QuickAction utility={utility} appState={appState} />
                    ))
                }
            </fieldset>
        </section>
    );
}