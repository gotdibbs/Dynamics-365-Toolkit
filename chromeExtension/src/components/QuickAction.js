import React, { useContext } from 'react';
import * as Fathom from 'fathom-client';

import { StoreContext } from './StoreProvider';
import '../styles/quickactions.css'

export default function QuickAction({ utility }) {
    const { state, actions } = useContext(StoreContext);

    function handleClick() {
        utility.action(state, actions);

        Fathom.trackGoal('JLUF5C3S', 0);
    }

    return (
        <button className="gotdibbs-toolbox-quickaction"
            title={utility.title}
            data-action={utility.key}
            data-testid={utility.key}
            onClick={handleClick}></button>
    );
}