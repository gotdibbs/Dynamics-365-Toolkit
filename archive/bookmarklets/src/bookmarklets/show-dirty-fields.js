import * as Fathom from 'fathom-client';
import Honeybadger from 'honeybadger-js';

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

    Fathom.trackGoal('VQYHGAGB', 0);
}
catch (e) {
    alert('An error was encountered. ' + e.message)
    Honeybadger.notify(e, {
        action: 'show-dirty-fields',
        component: 'bookmarklets',
        context: { version: config.fullVersion }
    });
}