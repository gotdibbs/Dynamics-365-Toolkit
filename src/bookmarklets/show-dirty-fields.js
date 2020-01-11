try { 
    var dirtyAttributes = [];

    formContext.Xrm.Page.data.entity.attributes.forEach(function(c, i){
        if (c && c.getIsDirty && c.getIsDirty()) {
            dirtyAttributes.push(c.getName());
        }
    });

    if (!dirtyAttributes || !dirtyAttributes.length) {
        alert('No attributes appear to be dirty on the current form.');
    }
    else {
        alert(['The following attributes are currently dirty: \n', 
            dirtyAttributes.join(', ')].join(''));
    }

    fathom && fathom('trackGoal', 'VQYHGAGB', 0);
}
catch (e) {
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'show-dirty-fields',
        component: 'bookmarklets',
        context: { version: config.version }
    });
}