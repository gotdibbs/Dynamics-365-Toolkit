function navigate(state) {
    let xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/main.aspx?pagetype=advancedfind'
    ].join(''), '_blank');
}

export default {
    navigate,
    isVisible: true,
    key: 'advanced-find',
    title: 'Advanced Find'
};