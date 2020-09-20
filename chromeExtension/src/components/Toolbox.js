import React, { useContext } from 'react';

import { StoreContext } from './StoreProvider';
import Header from './Header';
import Tabs from './Tabs';
import OpenObjectModal from './OpenObjectModal';
import AlertContainer from './AlertContainer';

export default function Toolbox({ setIsOpen }) {
    const { state, actions } = useContext(StoreContext);

    return (
        <div className="gotdibbs-toolbox gotdibbs-no-select"
            data-hook="gotdibbs-toolbox"
            style={{ height: state.isExpanded ? 'auto' : '2rem' }}>
            <Header toggleExpanded={actions.toggleExpanded}
                isExpanded={state.isExpanded}
                setIsOpen={setIsOpen} />
            <div className="gotdibbs-toolbox-container">
                {!state || !state.fullVersion ? (
                    <div className='gotdibbs-toolbox-loading'></div>
                ) : state.isExpanded ? <Tabs /> : null}
            </div>
            <OpenObjectModal />
            <AlertContainer />
        </div>
    );
}