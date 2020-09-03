import React, { useState } from 'react';
import Honeybadger from 'honeybadger-js';

function handleError(e, action, version) {
    alert('An error was encountered and unable to be recovered from. Please try again later or report the issue. ' + er.message);
    Honeybadger.notify(e, {
        action: action,
        component: 'form-action'
    });
}

const defaultNumberofRetries = 1;

function retry(fn, appState, setIsExpanded, remainingRetries = defaultNumberofRetries) {
    try {
        fn(appState, setIsExpanded);

        // No retry needed
        return false;
    }
    catch (e) {
        if (remainingRetries) {
            if (remainingRetries === defaultNumberofRetries &&
                window.confirm('It appears there was an error while performing this action. Would you like to try again?')) {
                // Wait for ~the next context update, then retry
                setTimeout(() => retry(fn, --remainingRetries), 501)

                return true;
            }
        }
        else {
            handleError(e, action, version);
        }
    }
}

export default function RetryableAction({ utility, appState, setIsExpanded }) {
    const [isRetrying, setIsRetrying] = useState(false);

    function handleClick(e) {
        e.preventDefault();

        if (retry(utility.action, appState, setIsExpanded, utility.retryCount)) {
            setIsRetrying(true);

            setTimeout(() => {
                setIsRetrying(false);
            }, 2000);
        }
    }

    return (
        <a href="#"
            className="gotdibbs-toolbox-item-link"
            title={utility.description}
            onClick={handleClick}>
            {isRetrying ? 'Retrying...' : utility.title}
        </a>
    );
}