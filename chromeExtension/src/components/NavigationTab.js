import React, { useContext } from 'react';

import { AppStateContext } from './AppStateProvider';
import NavigationTabItem from './NavigationTabItem';
import * as NavigationItems from '../navigation';

export default function NaviationTab() {
    const appState = useContext(AppStateContext);

    return (
        <section data-page="nav">
            <ul style={{ listStyleType: 'none' }}>
                {
                    Object.keys(NavigationItems).map(key => NavigationItems[key]).filter(navigationItem => {
                        return navigationItem.isVisible === true ||
                        navigationItem.isVisible(appState);
                    }).map((navigationItem, index) => (
                        <NavigationTabItem navigator={navigationItem} key={index} appState={appState} />
                    ))
                }
            </ul>
        </section>
    );
}