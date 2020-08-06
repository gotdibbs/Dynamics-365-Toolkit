import React, { useEffect } from 'react';
import classNames from 'classnames';
import Package from '../../package.json';

import Draggable from '../draggable';

export default function Header({ setIsOpen, setIsExpanded, isExpanded }) {
    useEffect(() => {
        new Draggable('[data-hook="gotdibbs-toolbox-header"]');
    }, []);

    function toggle() {
        setIsExpanded(expanded => !expanded);

        fathom && fathom('trackGoal', '4DZRNHHM', 0);
    }

    function close() {
        setIsOpen(false);

        fathom && fathom('trackGoal', 'IQRHDINK', 0);
    }

    const toggleClassName = classNames(
        'gotdibbs-toolbox-action',
        'gotdibbs-toolbox-collapse',
        {
            'collapsed': !isExpanded
        }
    );

    return (
        <header className="gotdibbs-toolbox-header" data-hook="gotdibbs-toolbox-header">
            GotDibbs Toolbox <small>v{Package.version}</small>
            <span className={toggleClassName} onClick={toggle}>&#x25BC;</span>
            <span className="gotdibbs-toolbox-action gotdibbs-toolbox-close" onClick={close}>&#10006;</span>
        </header>
    );
}