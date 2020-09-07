import React, { useContext } from 'react';

import { StoreContext } from './StoreProvider';

export default function NavigationTabItem({ navigator }) {
    const { state, actions } = useContext(StoreContext);

    function handleClick(e) {
        e.preventDefault();

        navigator.navigate(state, actions);
    }

    return (
        <li className="gotdibbs-toolbox-item">
            <a href="#" className="gotdibbs-toolbox-item-link" onClick={handleClick} data-testid={navigator.key}>
                {navigator.title}
            </a>
        </li>
    );
}