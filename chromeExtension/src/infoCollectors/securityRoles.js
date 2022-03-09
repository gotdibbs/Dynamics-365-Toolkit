import Honeybadger from '@honeybadger-io/js';

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

async function getInfo(state) {
    try {
        const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

        let serverUrl = xrm.Page.context.getClientUrl();

        if (state.majorVersion > 8) {
            let roles = parseGlobalSecurityRoles(xrm);

            if (roles && roles.length) {
                let result = [];

                roles.forEach(r => {
                    result.push(['<a href="', serverUrl, '/biz/roles/edit.aspx?id=', r.id, '" target="_blank" class="gotdibbs-toolbox-item-link">', r.name, '</a>'].join(''));
                });

                return result.join(', ');
            }
        }

        let roles = xrm.Page.context.getUserRoles();

        if (state.majorVersion < 8) {
            return roles.join(', ');
        }

        let response = await fetch([
            serverUrl, '/api/data/v8.0/roles?$select=name,_parentrootroleid_value&$filter=',
            'roleid eq ', roles.join(' or roleid eq ')
        ].join(''), {
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'OData-MaxVersion': '4.0',
                'OData-Version': '4.0'
            }
        });

        if (!response.ok || response.status != 200) {
            throw new Error('Invalid response');
        }

        let json = await response.json();

        if (!json || !json.value || !json.value.length) {
            return 'API Error';
        }

        let result = [];

        json.value.forEach(r => {
            result.push(['<a href="', serverUrl, '/biz/roles/edit.aspx?id=', r._parentrootroleid_value, '" target="_blank" class="gotdibbs-toolbox-item-link">', r.name, '</a>'].join(''));
        });

        return result.join(', ');
    }
    catch(e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while retrieving security roles',
            context: { xrm: !!xrm, serverUrl: serverUrl, roles: roles },
            params: { getIdsOnly: getIdsOnly }
        });
        console.error(e);
        return 'Unknown Error';
    }
}

export default {
    getInfo,
    isVisible: true,
    key: 'security-roles',
    label: 'Security Roles',
    className: 'gotdibbs-toolbox-breakwrap'
};