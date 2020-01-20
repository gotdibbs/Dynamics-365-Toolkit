export default function openPerformanceReport({ context: formContext, version }) {
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

    fathom && fathom('trackGoal', 'RMX7M5IX', 0);
};