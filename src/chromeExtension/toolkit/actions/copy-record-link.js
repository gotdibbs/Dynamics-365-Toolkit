export default function copyRecordLink({ context: formContext }) {
    var id = formContext.Xrm.Page.data.entity.getId(),
        entityName = formContext.Xrm.Page.data.entity.getEntityName(),
        url = formContext.Xrm.Page.context.getClientUrl();
    if (!id) {
        return alert('Failed to find id on this form.');
    }
    
    url = [url, '/main.aspx?', 'etn=', entityName, '&id=', id, '&pagetype=entityrecord'].join('');
    
    if (window.clipboardData && window.clipboardData.setData('Text', url)) {
        return;
    }
    else {
        window.prompt('Copy to clipboard: Ctrl+C, Enter', url);
    }

    fathom && fathom('trackGoal', '6AOAXPCL', 0);
};