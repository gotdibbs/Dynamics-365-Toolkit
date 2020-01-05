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
}
catch (e) {
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'enable-all-fields',
        component: 'bookmarklets',
        context: { version: config.version }
    });
}