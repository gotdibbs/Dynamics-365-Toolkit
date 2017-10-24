try {
    if (config.version == '6.0') {
        if (typeof formContext._IsRefreshForm != 'undefined' && formContext._IsRefreshForm == '1') { 
            formContext.OpenPerformanceUI(true);
        } 
        else { 
            formContext.OpenPerformanceUI(); 
        }
    }
    else if ((config.version === '6.1' || /^[7,8,9]\.\d+$/.test(config.version)) &&
        formContext.Mscrm && formContext.Mscrm.Performance && formContext.Mscrm.Performance.PerformanceCenter) {
        formContext.Mscrm.Performance.PerformanceCenter.get_instance().TogglePerformanceResultsVisibility();
    }
    else {
        alert('This feature is not supported on this version of Dynamics CRM.');
    }
}
catch(er) {
    alert('Error occurred opening performance report. '+ er.message);
}