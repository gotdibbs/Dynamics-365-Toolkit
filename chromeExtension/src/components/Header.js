import React, { useEffect } from 'react';
import classNames from 'classnames';
import Package from '../../package.json';

import Draggable from '../draggable';

export default function Header({ setIsOpen, toggleExpanded, isExpanded }) {
    useEffect(() => {
        new Draggable('[data-hook="gotdibbs-toolbox-header"]');
    }, []);

    function toggle() {
        toggleExpanded();
    }

    function close() {
        setIsOpen(false);
    }

    const toggleClassName = classNames(
        'gotdibbs-toolbox-action',
        'gotdibbs-toolbox-collapse',
        {
            'collapsed': !isExpanded
        }
    );

    return (
        <header className="gotdibbs-toolbox-header" data-hook="gotdibbs-toolbox-header" onDoubleClick={toggle}>
            GotDibbs Toolbox <small>v{Package.version}</small>
            <span className={toggleClassName} onClick={toggle}>&#x25BC;</span>
            <span className="gotdibbs-toolbox-action gotdibbs-toolbox-close" onClick={close}>&#10006;</span>
        </header>
    );
}