try {
    formContext.Xrm.Page.ui.controls.forEach(function(c, i){
        if (!c.__label) {
            c.__label = c.getLabel();
            c.setLabel(c.getName());
        }
        else {
            c.setLabel(c.__label);
            c.__label = null;
        }
    });
}
catch (e) {
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'toggle-schema-names',
        component: 'bookmarklets',
        context: { version: config.version }
    });
}