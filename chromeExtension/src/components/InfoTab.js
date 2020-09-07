import React, { useContext } from 'react';

import { StoreContext } from './StoreProvider';
import InfoTabItem from './InfoTabItem';
import { default as InfoCollectors } from '../infoCollectors';
import QuickAction from './QuickAction';
import { default as QuickActions } from '../utilities/quick-actions';

export default function InfoTab() {
    const { state } = useContext(StoreContext);

    if (!state || !state.fullVersion) {
        return null;
    }

    return (
        <section data-page="info" className="gotdibbs-toolbox-info" data-hook="gotdibbs-toolbox-info">
            <div>
                {
                    InfoCollectors.filter(collector => {
                        return collector.isVisible === true ||
                            collector.isVisible(state);
                    }).map(collector => (
                        <InfoTabItem collector={collector} key={collector.key} />
                    ))
                }
            </div>

            <fieldset className="gotdibbs-toolbox-quickactions" data-hook="gotdibbs-toolbox-quickactions">
                <legend>Quick Actions</legend>
                {
                    QuickActions.filter(utility => {
                        if (utility.requiresForm && !state.isForm) {
                            return false;
                        }

                        return true;
                    }).map(utility => (
                        <QuickAction utility={utility} key={utility.key} />
                    ))
                }
            </fieldset>
        </section>
    );
}