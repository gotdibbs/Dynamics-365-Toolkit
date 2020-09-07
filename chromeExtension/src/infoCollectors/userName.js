import Honeybadger from 'honeybadger-js';

function getGlobalContext(xrm) {
    if (xrm && xrm.getGlobalContext) {
        return xrm.getGlobalContext();
    }
    else if (xrm && xrm.Utility.getGlobalContext) {
        return xrm.Utility.getGlobalContext();
    }
}

async function getInfo(state) {
    try {
        const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;
        const context = getGlobalContext(xrm);
        const serverUrl = xrm.Page.context.getClientUrl();

        const userName = context && context.userSettings && context.userSettings.userName;
        const userId = context && context.userSettings && context.userSettings.userId;

        if (!userId) {
            return 'Unknown User';
        }

        return [
            '<a href="', serverUrl, '/main.aspx?pagetype=entityrecord',
            '&etn=systemuser',
            '&id=', userId, '" target="_blank" class="gotdibbs-toolbox-item-link">',
            userName || 'Unknown User Name',
            '</a>'
        ].join('');
    }
    catch(e) {
        Honeybadger.notify(e, {
            message: 'Error encountered while retrieving user details',
            context: { xrm: !!xrm, serverUrl: serverUrl }
        });

        return 'Unknown Error';
    }
}

function isVisible(state) {
    return state.majorVersion > 8;
}

export default {
    getInfo,
    isVisible,
    key: 'user-name',
    label: 'User Name'
};