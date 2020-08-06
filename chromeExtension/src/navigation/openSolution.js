import Honeybadger from 'honeybadger-js';
import * as Fathom from 'fathom-client';

function navigate(appState) {
    let xrm = appState.context.Xrm;

    let solutionName = window.prompt('Solution Unique Name:');

    if (!solutionName) {
        return;
    }

    fetch([
        xrm.Page.context.getClientUrl(), '/api/data/v8.2/solutions?$select=solutionid&$filter=uniquename eq \'', solutionName, '\''
    ].join(''), {
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0'
        }
    })
    .then(response => {
        if (response.ok && response.status == 200) {
            return response.json();
        }

        throw new Error('Invalid response');
    })
    .then(json => {
        if (!json || !json.value || !json.value.length || !json.value[0].solutionid) {
            alert('Could not locate the specified solution');
            return;
        }

        window.open([
            xrm.Page.context.getClientUrl(), '/tools/solution/edit.aspx?id=', json.value[0].solutionid
        ].join(''), '_blank');

        Fathom.trackGoal('G8YW7GJJ', 0);
    })
    .catch(e => {
        Honeybadger.notify(e, {
            message: 'Error encountered while attempting to open a solution',
            context: { xrm: !!xrm },
            params: { solutionName: solutionName }
        });
        console.error(e);
        alert('An error was encountered and has been logged.');
    });
}

function isVisible(appState) {
    return appState.majorVersion >= 8;
}

export default {
    navigate: Honeybadger.wrap(navigate),
    isVisible,
    title: 'Open Solution'
};