import * as Fathom from 'fathom-client';
import Honeybadger from 'honeybadger-js';

try {
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

    Fathom.trackGoal('EUBF1CHP', 0);
}
catch (e) {
    alert('An error was encountered. ' + e.message);
    Honeybadger.notify(e, {
        action: 'toggle-schema-names',
        component: 'bookmarklets',
        context: { version: config.fullVersion }
    });
}