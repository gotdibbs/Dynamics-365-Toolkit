import React, { useContext } from 'react';

import { StoreContext } from './StoreProvider';
import Alert from './Alert';
import '../styles/alert.css';

export default function AlertContainer() {
    const { state, actions } = useContext(StoreContext);

    if (!state || !state.alerts?.length) {
        return null;
    }

    return (
        <div className="gotdibbs-toolbox-alert-container">
            {
                state.alerts.map(data => <Alert data={data} key={data.id} remove={actions.removeAlert} />)
            }
        </div>
    );
}