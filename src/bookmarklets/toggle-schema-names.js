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

    fathom && fathom('trackGoal', 'EUBF1CHP', 0);
}
catch (e) {
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'toggle-schema-names',
        component: 'bookmarklets',
        context: { version: config.fullVersion }
    });
}