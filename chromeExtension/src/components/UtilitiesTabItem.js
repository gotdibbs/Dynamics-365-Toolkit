import React from 'react';

import RetryableAction from './RetryableAction';

export default function UtilitiesTabItem(props) {
    return (
        <li className="gotdibbs-toolbox-item">
            <RetryableAction
                className="gotdibbs-toolbox-item-link"
                {...props} />
        </li>
    );
}