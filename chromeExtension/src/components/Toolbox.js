import { useContext } from 'react';

import { ToggleContext } from './ToggleProvider';
import Header from './Header';
import Tabs from './Tabs';

export default function Toolbox({ setIsOpen}) {
    const { isExpanded, setIsExpanded } = useContext(ToggleContext);

    return (
        <div className="gotdibbs-toolbox gotdibbs-no-select"
            data-hook="gotdibbs-toolbox"
            style={{ height: isExpanded ? 'auto' : '2rem' }}>
            <Header setIsExpanded={setIsExpanded}
                isExpanded={isExpanded}
                setIsOpen={setIsOpen} />
            <div className="gotdibbs-toolbox-container">
                {isExpanded ? <Tabs /> : null}
            </div>
        </div>
    );
}