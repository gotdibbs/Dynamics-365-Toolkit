formContext.Xrm.Page.ui.controls.forEach(function(c, i){
    c.setVisible(true);
});

formContext.Xrm.Page.ui.tabs.forEach(function(c, i){
    c.setVisible(true);
    
    c.sections.forEach(function(sc, si){
        sc.setVisible(true);
    });
});