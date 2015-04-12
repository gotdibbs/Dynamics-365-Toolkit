try {
    var id = formContext.Xrm.Page.data.entity.getId();
    if (!id) {
        return alert('Failed to find id on this form.');
    }
    
    if (window.clipboardData) {
        window.clipboardData.setData('Text', id);
    }
    else { 
        window.prompt('Copy to clipboard: Ctrl+C, Enter', id);
    }
}
catch(er) {
    alert('Error occurred while retrieving record id. '+ er.message);
}