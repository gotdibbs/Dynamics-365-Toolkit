import React, { useContext } from 'react';

import { AppStateContext } from './AppStateProvider';
import NavigationTabItem from './NavigationTabItem';
import { default as NavigationItems } from '../navigation';

export default function NaviationTab() {
    const appState = useContext(AppStateContext);

    return (
        <section data-page="nav">
            <ul style={{ listStyleType: 'none' }}>
                {
                    NavigationItems.filter(navigationItem => {
                        return navigationItem.isVisible === true ||
                            navigationItem.isVisible(appState);
                    }).map(navigationItem => (
                        <NavigationTabItem navigator={navigationItem} key={navigationItem.key} appState={appState} />
                    ))
                }
            </ul>
        </section>
    );
}