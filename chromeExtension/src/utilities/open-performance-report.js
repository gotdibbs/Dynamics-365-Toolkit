import * as Fathom from 'fathom-client';

function openPerformanceReport({ version }) {
    let formContext = window.__GOTDIBBS_TOOLBOX__.context;

    if (version == '6.0') {
        if (typeof formContext._IsRefreshForm != 'undefined' && formContext._IsRefreshForm == '1') {
            formContext.OpenPerformanceUI(true);
        }
        else {
            formContext.OpenPerformanceUI();
        }
    }
    else if ((version === '6.1' || /^[7,8,9]\.\d+$/.test(version)) &&
        formContext.Mscrm && formContext.Mscrm.Performance && formContext.Mscrm.Performance.PerformanceCenter) {
        formContext.Mscrm.Performance.PerformanceCenter.get_instance().TogglePerformanceResultsVisibility();
    }
    else {
        alert('This feature is not supported on this version of Dynamics CRM.');
    }

    Fathom.trackGoal('RMX7M5IX', 0);
}

export default {
    action: openPerformanceReport,
    key: 'open-performance-report',
    title: 'Open Performance Report',
    description: 'Displays information about load times for the current view.',
    requiresForm: true,
    maxVersion: 8
};