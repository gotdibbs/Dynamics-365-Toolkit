import { default as Draggable } from './draggable.js'
import { default as retryFormAction } from './actions/retry.js';

var root,
    state,
    isForm,
    isToolboxPositioned,
    isHidden,
    isContextInitialized,
    currentId,
    interval;

function setActionDisplay(selector, displayMode) {
    let elems = root?.querySelectorAll(selector);

    if (!elems?.length) {
        return;
    }

    elems.forEach(elem => {
        if (elem.parentNode.nodeName === 'li') {
            elem.parentNode.style.dispaly = displayMode;
        }
        else {
            elem.style.display = displayMode;
        }
    });
}

function setFormActionDisplay(displayMode) {
    setActionDisplay('[data-formdependent]', displayMode);
}

function hide(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    clearInterval(interval);
    interval = null;

    root.querySelector('[data-hook="gotdibbs-toolbox"]').style.display = 'none';
    isHidden = true;

    fathom('trackGoal', 'IQRHDINK', 0);

    return false;
}

function toggle() {
    var elem = root.querySelector('[data-hook="gotdibbs-toolbox"]'),
        toggle = root.querySelector('[data-hook="gotdibbs-toolbox-collapse"]'),
        toggleState = toggle.dataset.expanded;

    if (toggleState === 'true') {
        toggle.dataset.expanded = 'false';
        toggle.classList.add('collapsed');
        elem.style.height = '2rem';
    }
    else {
        toggle.dataset.expanded = 'true';
        toggle.classList.remove('collapsed');
        elem.style.height = 'auto';
    }

    fathom('trackGoal', '4DZRNHHM', 0);
}

function updatePane() {
    try {
        var xrm = state.context.Xrm;
        let version = parseInt(state.version.split('.')[0]);

        if (isForm) {
            let id = null;
            
            try {
                id = xrm.Page.data.entity.getId && xrm.Page.data.entity.getId();
            }
            catch (e) {
                if (version < 9) {
                    // Swallow intermittent errors
                    return;
                }

                Honeybadger.notify(e, 'Failed to retrieve record ID while updating information panel');
            }

            let logicalName = xrm.Page.data.entity.getEntityName && xrm.Page.data.entity.getEntityName();

            if (id === currentId) {
                // If the page hasn't changed, no further update is needed
                return;
            }

            currentId = id;
            
            if (id) {
                root.querySelector('[data-hook="gotdibbs-toolbox-recordid"]').innerHTML = id;
                root.querySelector('[data-hook="gotdibbs-toolbox-recordlink"]').innerHTML = [
                    xrm.Page.context.getClientUrl(), '/main.aspx?etn=', logicalName, '&id=', id, '&pagetype=entityrecord'
                ].join('');
            }
            else {
                root.querySelector('[data-hook="gotdibbs-toolbox-recordid"]').innerHTML = 'Record doesn\'t yet exist';
                root.querySelector('[data-hook="gotdibbs-toolbox-recordlink"]').innerHTML = [
                    xrm.Page.context.getClientUrl(), '/main.aspx?etn=', logicalName, '&pagetype=entityrecord'
                ].join('');
            }

            root.querySelector('[data-hook="gotdibbs-toolbox-logicalname"]').innerHTML = logicalName;

            root.querySelector('[data-hook="gotdibbs-toolbox-recordinfo"]').style.display = 'block';

            setFormActionDisplay('initial');
        }
        else {
            currentId = null;

            root.querySelector('[data-hook="gotdibbs-toolbox-recordid"]').innerHTML = '';
            root.querySelector('[data-hook="gotdibbs-toolbox-recordlink"]').innerHTML = '';
            root.querySelector('[data-hook="gotdibbs-toolbox-logicalname"]').innerHTML = '';

            root.querySelector('[data-hook="gotdibbs-toolbox-recordinfo"]').style.display = 'none';

            setFormActionDisplay('none');
        }

        if (version >= 9) {
            getAppName();
        }
        else {
            root.querySelector('[data-hook="gotdibbs-toolbox-appname"]').innerHTML = 'N/A';
        }

        if (!isContextInitialized) {
            // We only need to pull and set the below information once per instance
            isContextInitialized = true;
            root.querySelector('[data-hook="gotdibbs-toolbox-userid').innerHTML = xrm.Page.context.getUserId();
            root.querySelector('[data-hook="gotdibbs-toolbox-org').innerHTML = xrm.Page.context.getOrgUniqueName();
            root.querySelector('[data-hook="gotdibbs-toolbox-version').innerHTML = state.fullVersion;

            if (version < 8) {
                setActionDisplay('[data-hook="gotdibbs-toolbox-opensolution"]', 'none');
                setActionDisplay('[data-hook="gotdibbs-toolbox-roles"]', 'none');
            }
            if (version >= 9) {
                setActionDisplay('[data-action="open-performance-report"]', 'none');
                setActionDisplay('[data-action="show-record-properties"]', 'none');
            }
            if (version < 9) {
                setActionDisplay('[data-action="open-ribbon-debug"]', 'none');
            }

            getSecurityRoles(version < 8);
        }
    }
    catch (e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while updating information panel'
        });
    }
}

function checkState() {
    try {
        if (!window.GotDibbs) {
            clearInterval(interval);
            return;
        }

        if (!isToolboxPositioned) {
            isToolboxPositioned = true;
            root.querySelector('[data-hook="gotdibbs-toolbox"]').removeAttribute('style');
            new Draggable('[data-hook="gotdibbs-toolbox-header"]');
        }
        else if (isHidden) {
            root.querySelector('[data-hook="gotdibbs-toolbox"]').style.display = 'block';
            isHidden = false;
        }

        state = window.GotDibbs.getState();

        if (!state) {
            return;
        }

        Honeybadger.setContext({
            source: 'chrome_extension_content',
            version: state && state.version
        });

        if (state.context && state.context.Xrm &&
            state.context.Xrm.Page && 
            state.context.Xrm.Page.ui && state.context.Xrm.Page.data &&
            state.context.Xrm.Page.data.entity) {
            if (!isForm) {
                isForm = true;
            }
        }
        else if (isForm) {
            isForm = false;
        }

        updatePane();
    }
    catch (e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while attempting to update context'
        });
    }
}

function switchPage(e) {
    let destinationLink = e.target.parentNode,
        destination = destinationLink.dataset.to,
        sourceLink = root.querySelector('.tab-current > a'),
        source = sourceLink.dataset.to,
        currentPage = root.querySelector(['[data-page="', source, '"]'].join('')),
        nextPage = root.querySelector(['[data-page="', destination, '"]'].join(''));

    currentPage.style.display = 'none';
    sourceLink.parentNode.classList.remove('tab-current');
    nextPage.style.display = 'block';
    destinationLink.parentNode.classList.add('tab-current');
}

function copy(e) {
    let source = e.target,
        html = source.innerHTML,
        text = source.textContent;

    if (e.target.dataset.copy == null) {
        return;
    }

    var input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);

    input.select();
    document.execCommand('copy');
    input.remove();

    source.innerHTML = 'Copied!';

    setTimeout(() => {
        source.innerHTML = html;
    }, 1000);

    fathom('trackGoal', 'D0KU4IIK', 0);
}

function getGlobalContext(xrm) {
    if (xrm && xrm.getGlobalContext) {
        return xrm.getGlobalContext();
    }
    else if (xrm && xrm.Utility.getGlobalContext) {
        return xrm.Utility.getGlobalContext();
    }
}

function parseGlobalSecurityRoles(xrm) {
    const context = getGlobalContext(xrm);

    return context && context.userSettings && context.userSettings.roles && 
        context.userSettings.roles.getAll && context.userSettings.roles.getAll();
}

function getAppName() {
    let xrm = state.context.Xrm,
        context = getGlobalContext(xrm);

    if (context && context.getCurrentAppName) {
        context.getCurrentAppName().then(name => {
            root.querySelector('[data-hook="gotdibbs-toolbox-appname"]').innerHTML = name;
        });
    }
}

function getSecurityRoles(getIdsOnly) {
    let xrm = state.context.Xrm;
    let serverUrl = xrm.Page.context.getClientUrl();
    let version = parseInt(state.version.split('.')[0]);

    if (version >= 9) {
        let roles = parseGlobalSecurityRoles(xrm);

        if (roles && roles.length) {
            let result = [];
            
            roles.forEach(r => {
                result.push(['<a href="', serverUrl, '/biz/roles/edit.aspx?id=', r.id, '" target="_blank" class="gotdibbs-toolbox-item-link">', r.name, '</a>'].join(''));
            });

            root.querySelector('[data-hook="gotdibbs-toolbox-roles"]').innerHTML = result.join(', ');

            return;
        }
    }

    let roles = xrm.Page.context.getUserRoles();

    if (getIdsOnly) {
        root.querySelector('[data-hook="gotdibbs-toolbox-roles"]').innerHTML = roles.join(', ');
        return;
    }

    fetch([
        serverUrl, '/api/data/v8.0/roles?$select=name,_parentrootroleid_value&$filter=',
        'roleid eq ', roles.join(' or roleid eq ')
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
            if (!json || !json.value || !json.value.length) {
                return;
            }

            let result = [];

            json.value.forEach(r => {
                result.push(['<a href="', serverUrl, '/biz/roles/edit.aspx?id=', r._parentrootroleid_value, '" target="_blank" class="gotdibbs-toolbox-item-link">', r.name, '</a>'].join(''));
            });

            root.querySelector('[data-hook="gotdibbs-toolbox-roles"]').innerHTML = result.join(', ');
        })
        .catch(e => {
            Honeybadger.notify(e, {
                message: 'Error encountered while retrieving security roles',
                context: { xrm: !!xrm, serverUrl: serverUrl, roles: roles },
                params: { getIdsOnly: getIdsOnly }
            });
            console.error(e);
            root.querySelector('[data-hook="gotdibbs-toolbox-roles"]').innerHTML = 'Error encountered while retrieving roles. See console.';
        });
}

function openAdvancedFind() {
    let xrm = state.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=advancedfind'
    ].join(''), '_blank');

    fathom('trackGoal', 'DEE4P4OM', 0);
}

function openList() {
    let xrm = state.context.Xrm;

    let logicalName = window.prompt('Logical Name:');

    if (!logicalName) {
        return;
    }

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=entitylist&etn=', logicalName
    ].join(''), '_blank');

    fathom('trackGoal', 'IJGSMM1T', 0);
}

function openRecord() {
    let xrm = state.context.Xrm;

    let logicalName = window.prompt('Logical Name:');

    if (!logicalName) {
        return;
    }

    let id = window.prompt('ID (leave blank for new record):');

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=entityrecord&etn=', logicalName, id ? '&id=' + id : ''
    ].join(''), '_blank');

    fathom('trackGoal', '7YHT3JKI', 0);
}

function openSolution() {
    let xrm = state.context.Xrm;

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

            fathom('trackGoal', 'G8YW7GJJ', 0);
        })
        .catch(e => {
            Honeybadger.notify(e, {
                message: 'Error encountered while attempting to open a solution',
                context: { xrm: !!xrm },
                params: { solutionName: solutionName }
            });
            console.error(e);
            alert('An error was encountered and has been logged to the console.');
        });
}

function importSolution() {
    let xrm = state.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/tools/solution/import/SolutionImportWizard.aspx'
    ].join(''), '_blank');

    fathom('trackGoal', 'UGHZ7JZ7', 0);
}

function launchRibbonDebug(retries = 0) {
    let button = document.getElementById('CommandChecker') ||
        document.querySelector('button[data-id="CommandChecker"]')?.parentNode;

    if (!button && retries >= 5) {
        Honeybadger.notify({
            message: 'Could not locate the command checker ribbon button'
        });

        return alert('Sorry! Could not find the button for you, but it should be on the page somewhere...');
    }
    else if (!button) {
        return setTimeout(() => launchRibbonDebug(++retries), 1000);
    }

    button.click();
    document.body.focus();
    // Get out the way
    toggle();

    fathom('trackGoal', 'ASIUFPXT', 0);
}

function openRibbonDebug() {
    if (window.location.search.match(/ribbondebug/)) {
        return launchRibbonDebug();
    }

    try {
        // Try to update the store
        let storeName = Object.keys(window).find(k => k?.startsWith('__store$'));

        if (!storeName) {
            throw new Error('Failed to find redux store on window');
        }

        let store = window[storeName];

        if (!store?.getState || !store.getState()) {
            throw new Error('Store does not appear to have the right structure');
        }

        let state = store.getState();

        if (!state?.configuration) {
            throw new Error('Store does not appear to have the `configuration.ribbonDebug` key');
        }

        Honeybadger.addBreadcrumb('Accessed store with appropriate shape');

        let ribbonDebugPreviousState = state.configuration.ribbonDebug;

        store.dispatch({ type: 'initialize.configuration.from.url', payload: { ribbonDebug: true } });

        Honeybadger.addBreadcrumb('Dispatched');

        setTimeout(() => {
            // Give UI time to repaint
            state = store.getState();

            if (ribbonDebugPreviousState !== true && ribbonDebugPreviousState === state.configuration.ribbonDebug) {
                throw new Error('Dispatch failed to update relevant store key');
            }
    
            launchRibbonDebug();
        }, 1);
    }
    catch (e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while attempting to open the ribbon debugger'
        });

        if (window.confirm('We were unable to auto-launch the ribbon debugger so we need to refresh the page. Cool?')) {
            window.location.href = window.location.href + '&ribbondebug=true';
        }
    }
}

async function requestInvokeFormAction(e) {
    let target = e.target,
        action = target.dataset.action || target.parentNode.dataset.action;

    if (!action) {
        return;
    }

    if (action === 'open-ribbon-debug') {
        return openRibbonDebug();
    }
    else if (action === 'get-support') {
        return window.open('https://github.com/gotdibbs/Dynamics-CRM-Bookmarklets/issues/new', '_new');
    }

    if (!isForm) {
        alert('This action can only be performed while viewing a record. Please try once a record has fully loaded.');
        return;
    }

    const moduleSpecifier = `./actions/${action}.js`;
    const module = await import(moduleSpecifier)
    retryFormAction(() => module.default(state),
        action,
        state.fullVerison);
}

function show() {
    if (interval) {
        return;
    }

    checkState();
    interval = setInterval(checkState, 500);
}

function handleEvent(e) {
    let message = e.detail;

    switch (message.type) {
        case 'LAUNCH_TOOLBOX':
            show();
            break;
    }
}

function init() {
    fathom('trackPageview');

    document.addEventListener('gotdibbs-toolbox', handleEvent);

    root = document.querySelector('[data-hook="gotdibbs-toolbox-root"]');

    // Listen for toolbox close
    root.querySelector('[data-hook="gotdibbs-toolbox-close"]').addEventListener('mousedown', Honeybadger.wrap(hide));
    // Listen for toolbox collapse/expand
    root.querySelector('[data-hook="gotdibbs-toolbox-collapse"]').addEventListener('click', Honeybadger.wrap(toggle));
    // Listen for toolbox tab switch
    root.querySelector('[data-hook="gotdibbs-toolbox-navbar"]').addEventListener('click', Honeybadger.wrap(switchPage));
    // Listen for toolbox info copy request
    root.querySelector('[data-hook="gotdibbs-toolbox-info"]').addEventListener('dblclick', Honeybadger.wrap(copy));

    // Listen for Navigation requests
    root.querySelector('[data-hook="gotdibbs-toolbox-openaf"]').addEventListener('click', Honeybadger.wrap(openAdvancedFind));
    root.querySelector('[data-hook="gotdibbs-toolbox-import"]').addEventListener('click', Honeybadger.wrap(importSolution));
    root.querySelector('[data-hook="gotdibbs-toolbox-openlist"]').addEventListener('click', Honeybadger.wrap(openList));
    root.querySelector('[data-hook="gotdibbs-toolbox-openrecord"]').addEventListener('click', Honeybadger.wrap(openRecord));
    root.querySelector('[data-hook="gotdibbs-toolbox-opensolution"]').addEventListener('click', Honeybadger.wrap(openSolution));

    // Listen for form action requests
    root.querySelector('[data-hook="gotdibbs-toolbox-formactions"]').addEventListener('click', requestInvokeFormAction);
    root.querySelector('[data-hook="gotdibbs-toolbox-quickactions"]').addEventListener('click', requestInvokeFormAction);

    show();
}

(function(f, a, t, h, o, m){
    a[h]=a[h]||function(){
        (a[h].q=a[h].q||[]).push(arguments)
    };
    o=f.createElement('script'),
    m=f.getElementsByTagName('script')[0];
    o.async=1; o.src=t; o.id='fathom-script';
    m.parentNode.insertBefore(o,m)
})(document, window, 'https://cdn.usefathom.com/tracker.js', 'fathom');
fathom('set', 'siteId', 'HIILGHZZ');

init();