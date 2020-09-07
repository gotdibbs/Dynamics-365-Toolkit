import React, { useContext } from 'react';

import { StoreContext } from './StoreProvider';
import NavigationTabItem from './NavigationTabItem';
import { default as NavigationItems } from '../navigation';

export default function NaviationTab() {
    const { state } = useContext(StoreContext);

    if (!state || !state.fullVersion) {
        return null;
    }

    return (
        <section data-page="nav">
            <ul style={{ listStyleType: 'none' }}>
                {
                    NavigationItems.filter(navigationItem => {
                        return navigationItem.isVisible === true ||
                            navigationItem.isVisible(state);
                    }).map(navigationItem => (
                        <NavigationTabItem navigator={navigationItem} key={navigationItem.key} />
                    ))
                }
            </ul>
        </section>
    );
}