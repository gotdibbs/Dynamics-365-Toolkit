function navigate(state) {
    let xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=entitylist&etn=plugintracelog'
    ].join(''), '_blank');
}

export default {
    navigate,
    isVisible: true,
    key: 'plugin-trace-logs',
    title: 'Plugin Trace Logs'
};