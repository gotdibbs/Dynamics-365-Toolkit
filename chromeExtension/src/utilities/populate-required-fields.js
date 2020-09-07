import * as Fathom from 'fathom-client';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

function getRandomString(targetLength) {
    let result = '';

    for (let i = 0; i < targetLength; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
 }

function trimDate(targetLength) {
    let result = (new Date()).toISOString();

    return result.substr(0, targetLength);
}

function setFieldValue(attribute, xrm) {
    if (attribute.getRequiredLevel() !== 'required' || attribute.getValue()) {
        return;
    }

    switch (attribute.getAttributeType()) {
        case 'memo':
            attribute.setValue(getRandomString(10));
            break;
        case 'string':
            attribute.setValue(trimDate(attribute.getMaxLength()));
            break;
        case 'boolean':
            attribute.setValue(false);
            break;
        case 'datetime':
            attribute.setValue(new Date());
            break;
        case 'decimal':
        case 'double':
        case 'integer':
        case 'money':
            attribute.setValue(attribute.getMin());
            break;
        case 'optionset':
            let options = attribute.getOptions();
            attribute.setValue(options[0].value);
            break;
    }
}

function populateRequiredFields() {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    if (xrm.Page.ui.getFormType() !== 1) {
        alert('This action cannot be run against an existing record.');
        return;
    }

    xrm.Page.data.entity.attributes
        .forEach(attribute => setFieldValue(attribute, xrm));

    Fathom.trackGoal('KUBOKLQ9', 0);
}

export default {
    action: populateRequiredFields,
    key: 'populate-required-fields',
    title: 'Populate Required Fields',
    description: 'Finds all required fields and sets a value, with the exception of lookups.',
    requiresForm: true
};
