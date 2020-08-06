import React from 'react';

export default function QuickAction({ utility, appState }) {

    function handleClick() {
        utility.action(appState);
    }

    return (
        <button className="gotdibbs-toolbox-quickaction"
            title={utility.title}
            data-action={utility.key}
            onClick={handleClick}></button>
    );
}