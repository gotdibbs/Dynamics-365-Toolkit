import React from 'react';
import * as Fathom from 'fathom-client';

export default function QuickAction({ utility, appState }) {

    function handleClick() {
        utility.action(appState);

        Fathom.trackGoal('JLUF5C3S', 0);
    }

    return (
        <button className="gotdibbs-toolbox-quickaction"
            title={utility.title}
            data-action={utility.key}
            onClick={handleClick}></button>
    );
}