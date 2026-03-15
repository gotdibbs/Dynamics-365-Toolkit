function navigate(state) {
    let xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    window.open([
        xrm.Page.context.getClientUrl(), '/tools/solution/import/SolutionImportWizard.aspx'
    ].join(''), '_blank');
}

export default {
    navigate,
    isVisible: true,
    key: 'import-solution',
    title: 'Import Solution'
};