import React, { useState } from 'react';

import InfoTab from './InfoTab';
import NavigationTab from './NavigationTab';
import UtilitiesTab from './UtilitiesTab';

const TABS = {
    INFO: 0,
    NAVIGATION: 1,
    UTILITIES: 2
};

export default function Tabs() {
    const [activeTab, setActiveTab] = useState(TABS.INFO);

    function onTabSwitch(e) {
        e.preventDefault();

        if (e.currentTarget.dataset.to) {
            setActiveTab(parseInt(e.currentTarget.dataset.to, 10));
        }
    }

    let VisibleTab = null;

    switch (activeTab) {
        case TABS.NAVIGATION:
            VisibleTab = NavigationTab;
            break;
        case TABS.UTILITIES:
            VisibleTab = UtilitiesTab;
            break;
        default:
            VisibleTab = InfoTab;
            break;
    }

    return (
        <div className="gotdibbs-tabs">
            <nav>
                <ul data-hook="gotdibbs-toolbox-navbar">
                    <li className={activeTab === TABS.INFO ? 'tab-current' : null}>
                        <a href="#" data-to={TABS.INFO} onClick={onTabSwitch}>
                            <span>Info</span>
                        </a>
                    </li>
                    <li className={activeTab === TABS.NAVIGATION ? 'tab-current' : null}>
                        <a href="#" data-to={TABS.NAVIGATION} onClick={onTabSwitch}>
                            <span>Navigation</span>
                        </a>
                    </li>
                    <li className={activeTab === TABS.UTILITIES ? 'tab-current' : null}>
                        <a href="#" data-to={TABS.UTILITIES} onClick={onTabSwitch}>
                            <span>Utilities</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="content-wrap">
                <VisibleTab />
            </div>
        </div>
    );
}
