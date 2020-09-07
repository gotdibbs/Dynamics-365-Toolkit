import * as Fathom from 'fathom-client';

function showDirtyFields() {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    var dirtyAttributes = [];

    xrm.Page.data.entity.attributes.forEach(function (c, i) {
        if (c && c.getIsDirty && c.getIsDirty()) {
            dirtyAttributes.push(c.getName());
        }
    });

    if (!dirtyAttributes || !dirtyAttributes.length) {
        alert('No attributes appear to be dirty on the current form.');
    } else {
        alert(['The following attributes are currently dirty: \n', dirtyAttributes.join(', ')].join(''));
    }

    Fathom.trackGoal('VQYHGAGB', 0);
}

export default {
    action: showDirtyFields,
    key: 'show-dirty-fields',
    title: 'Show Dirty Fields',
    description: 'Displays a list of all fields on the form which are currently flagged as having changed.',
    requiresForm: true
};
