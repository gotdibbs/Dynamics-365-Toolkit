import React, { useContext } from 'react';
import Honeybadger from '@honeybadger-io/js';

import { StoreContext } from './StoreProvider';
import '../styles/quickactions.css'

export default function QuickAction({ utility }) {
    const { state, actions } = useContext(StoreContext);

    function handleClick() {
        try {
            utility.action(state, actions);
        }
        catch(e) {
            Honeybadger.notify(e, `Error while executing action '${action.title}'`);
        }
    }

    return (
        <button className="gotdibbs-toolbox-quickaction"
            title={utility.title}
            data-action={utility.key}
            data-testid={utility.key}
            onClick={handleClick}></button>
    );
}