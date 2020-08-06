try {
    var id,
        typeCode;

    if (Mscrm && Mscrm.RibbonActions && Mscrm.RibbonActions.openFormProperties) {
        id = formContext.Xrm.Page.data.entity.getId()
        typeCode = formContext.Xrm.Page.context.getQueryStringParameters().etc;
        
        if (!typeCode) {
            return alert('Could not locate the current record type.');
        }

        Mscrm.RibbonActions.openFormProperties(id, typeCode);
    }
    else {
        alert('This action is not supported in the current version of Dynamics CRM.');
    }

    fathom && fathom('trackGoal', '8EHBNIHL', 0);
}
catch (e) {
    alert('An error was encountered. ' + e.message)
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'show-record-properties',
        component: 'bookmarklets',
        context: { version: config.fullVersion }
    });
}