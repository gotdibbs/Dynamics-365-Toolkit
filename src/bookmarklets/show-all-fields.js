try {
    formContext.Xrm.Page.ui.controls.forEach(function(c, i){
        c.setVisible(true);
    });

    formContext.Xrm.Page.ui.tabs.forEach(function(c, i){
        // Show the tab
        c.setVisible(true);
        
        // Expand the tab
        c.setDisplayState('expanded');

        // Show all the sections contained in the tab
        c.sections.forEach(function(sc, si){
            sc.setVisible(true);
        });
    });
}
catch (e) {
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'show-all-fields',
        component: 'bookmarklets',
        context: { version: config.version }
    });
}