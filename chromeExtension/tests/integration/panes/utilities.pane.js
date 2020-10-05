import { Toolbox } from './toolbox';

class UtilitiesPane extends Toolbox {
    get UtilitiesTabItem() {
        return $(`.gotdibbs-tabs [data-to="2"]`);
    }

    get OpenObject() {
        return $('[data-testid="openobject"]');
    }

    get OpenObjectCancel() {
        return $('[data-testid="openobjectcancel"]');
    }

    get CopyRecordId() {
        return $('[data-testid="copy-record-id"]');
    }

    get CopyRecordLink() {
        return $('[data-testid="copy-record-link"]');
    }

    get UnlockAllFields() {
        return $('[data-testid="enable-all-fields"]');
    }

    get FocusFieldLink() {
        return $('[data-testid="focus-field"]');
    }

    get FocusFieldInput() {
        return $('[data-testid="fieldLogicalName"]');
    }

    get ShowAllFields() {
        return $('[data-testid="show-all-fields"]');
    }

    get ShowDirtyFields() {
        return $('[data-testid="show-dirty-fields"]');
    }

    get ToggleSchemaNames() {
        return $('[data-testid="toggle-schema-names"]');
    }

    get OpenCommandChecker() {
        return $('[data-testid="open-ribbon-debugger"]');
    }

    get CommandChecker() {
        return $('[data-id="CommandChecker"]');
    }

    get PopulateRequiredFields() {
        return $('[data-testid="populate-required-fields"]');
    }

    get ShowEntityData() {
        return $('[data-testid="show-entity-data"]');
    }

    get CloseShowEntityDataModal() {
        return $('[data-testid="cancel-entity-data-modal"]');
    }

    copyRecordId() {
        this.CopyRecordId.click();

        browser.waitUntil(() => browser.getAlertText());

        browser.acceptAlert();
    }

    copyRecordLink() {
        this.CopyRecordLink.click();

        browser.waitUntil(() => browser.getAlertText());

        browser.acceptAlert();
    }

    disableField(field) {
        browser.execute(field => {
            window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getControl(field).setDisabled(true);
        }, field);
    }

    unlockAllFields() {
        this.UnlockAllFields.click();
    }

    focusField(logicalName) {
        this.FocusFieldLink.click();

        this.FocusFieldInput.waitForDisplayed();
        this.FocusFieldInput.setValue(logicalName);

        this.OpenObject.click();
    }

    hideField(field) {
        browser.execute(field => {
            window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getControl(field).setVisible(false);
        }, field);
    }

    showAllFields() {
        this.ShowAllFields.click();
    }

    showDirtyFields() {
        this.ShowDirtyFields.click();
    }

    showEntityData() {
        this.ShowEntityData.click();
    }

    changeField(field) {
        this.currentFieldValue = browser.execute(field => {
            let value = window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getAttribute(field).getValue();
            window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getAttribute(field).setValue(new Date().toISOString());
            return value;
        }, field);
    }

    changeFieldBack(field) {
        browser.execute((field, value) => {
            window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getAttribute(field).setValue(value);
        }, field, this.currentFieldValue);
    }

    toggleSchemaNames() {
        this.ToggleSchemaNames.click();
    }

    openCommandChecker() {
        this.OpenCommandChecker.click();
    }

    populateRequiredFields(field) {
        // The form has issues with focus in automation scenarios, so specifically set focus, then save
        //  to ensure we're at a common starting point where the form is invalid
        browser.keys(['Control', 's']);

        $('span*=Required fields').waitForDisplayed();

        // Now that we're in a expected and consistent state, click da button
        this.PopulateRequiredFields.click();
    }

    open () {
        super.open();

        this.UtilitiesTabItem.click();
    }
}

export default new UtilitiesPane();
