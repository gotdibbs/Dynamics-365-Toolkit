import React from 'react';

export default function NavigationTabItem({ navigator, appState }) {

    function handleClick(e) {
        e.preventDefault();

        navigator.navigate(appState);
    }

    return (
        <li className="gotdibbs-toolbox-item">
            <a href="#" className="gotdibbs-toolbox-item-link" onClick={handleClick}>
                {navigator.title}
            </a>
        </li>
    );
}