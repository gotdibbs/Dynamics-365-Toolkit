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