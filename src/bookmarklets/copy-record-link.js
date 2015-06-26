try {
    var id = formContext.Xrm.Page.data.entity.getId(),
        entityName = formContext.Xrm.Page.data.entity.getEntityName(),
        url = formContext.Xrm.Page.context.getClientUrl();
    if (!id) {
        return alert('Failed to find id on this form.');
    }
    
    url = [url, '/main.aspx?', 'etn=', entityName, '&id=', id, '&pagetype=entityrecord'].join('');
    
    if (window.clipboardData) {
        window.clipboardData.setData('Text', url);
    }
    else { 
        window.prompt('Copy to clipboard: Ctrl+C, Enter', url);
    }
}
catch(er) {
    alert('Error occurred while retrieving record url. '+ er.message);
}