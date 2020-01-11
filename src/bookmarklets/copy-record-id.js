try {
    var id = formContext.Xrm.Page.data.entity.getId();
    if (!id) {
        return alert('Failed to find id on this form.');
    }
    
    if (window.clipboardData && window.clipboardData.setData('Text', id)) {
        return;
    }
    else { 
        window.prompt('Copy to clipboard: Ctrl+C, Enter', id);
    }

    fathom && fathom('trackGoal', '5TP4Q3GP', 0);
}
catch(er) {
    alert('Error occurred while retrieving record id. ' + er.message);
    Honeybadger && Honeybadger.notify && Honeybadger.notify(e, {
        action: 'copy-record-id',
        component: 'bookmarklets',
        context: { version: config.version }
    });
}