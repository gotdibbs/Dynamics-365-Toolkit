function handleError(e, action, version) {
    alert('An error was encountered and unable to be recovered from. Please try again later or report the issue. ' + er.message);
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: action,
        component: 'form-action',
        context: { version: version }
    });
}

function flexRetry(action) {
    let el = document.querySelector(`[data-action="${action}"]`);

    if (!el) {
        // Hey, we tried
        return;
    }

    var currentContent = el.innerHTML;

    el.innerHTML = "Retrying...";

    setTimeout(() => el.innerHTML = currentContent, 2000);
}

const defaultNumberofRetries = 1;

export default function retry(fn, action, version, remainingRetries = defaultNumberofRetries) {
    try {
        fn();
    }
    catch (e) {
        if (remainingRetries) {
            if (remainingRetries === defaultNumberofRetries &&
                window.confirm('It appears there was an error while performing this action. Would you like to try again?')) {
                // Why be shy about a retry?
                flexRetry(action);
            }
            // Wait for ~the next context update, then retry
            setTimeout(() => retry(fn, action, version, --remainingRetries), 501);
        }
        else {
            handleError(e, action, version);
        }
    }
}