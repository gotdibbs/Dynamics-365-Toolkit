try {
    formContext.Xrm.Page.ui.controls.forEach(function(c, i){
        if (c && c.setDisabled) {
            c.setDisabled(false);
        }
    });

    formContext.Xrm.Page.data.entity.attributes.forEach(function(c, i){
        if (c && c.setSubmitMode) {
            c.setSubmitMode('always');
        }
    });

    fathom && fathom('trackGoal', 'WVP4ETTK', 0);
}
catch (e) {
    alert('An error was encountered. ' + e.message);
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'enable-all-fields',
        component: 'bookmarklets',
        context: { version: config.fullVersion }
    });
}