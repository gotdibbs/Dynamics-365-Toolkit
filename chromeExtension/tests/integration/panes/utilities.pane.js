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

    async copyRecordId() {
        await this.CopyRecordId.click();

        await browser.waitUntil(async () => await browser.getAlertText());

        await browser.acceptAlert();
    }

    async copyRecordLink() {
        await this.CopyRecordLink.click();

        await browser.waitUntil(async () => await browser.getAlertText());

        await browser.acceptAlert();
    }

    async disableField(field) {
        await browser.execute((field) => {
            window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getControl(field).setDisabled(true);
        }, field);
    }

    async unlockAllFields() {
        await this.UnlockAllFields.click();
    }

    async focusField(logicalName) {
        await this.FocusFieldLink.click();

        await this.FocusFieldInput.waitForDisplayed();
        await this.FocusFieldInput.setValue(logicalName);

        await this.OpenObject.click();
    }

    async hideField(field) {
        await browser.execute((field) => {
            window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getControl(field).setVisible(false);
        }, field);
    }

    async showAllFields() {
        await this.ShowAllFields.click();
    }

    async showDirtyFields() {
        await this.ShowDirtyFields.click();
    }

    async showEntityData() {
        await this.ShowEntityData.click();
    }

    async changeField(field) {
        this.currentFieldValue = await browser.execute((field) => {
            let value = window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getAttribute(field).getValue();
            window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getAttribute(field).setValue(new Date().toISOString());
            return value;
        }, field);
    }

    async changeFieldBack(field) {
        await browser.execute((field, value) => {
            window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getAttribute(field).setValue(value);
        }, field, this.currentFieldValue);
    }

    async toggleSchemaNames() {
        await this.ToggleSchemaNames.click();
    }

    async openCommandChecker() {
        await this.OpenCommandChecker.click();
    }

    async populateRequiredFields(field) {
        // The form has issues with focus in automation scenarios, so specifically set focus, then save
        //  to ensure we're at a common starting point where the form is invalid
        await browser.keys(['Control', 's']);

        await $('span*=Required fields').waitForDisplayed();

        // Now that we're in a expected and consistent state, click da button
        await this.PopulateRequiredFields.click();
    }

    async open() {
        await super.open();

        await this.UtilitiesTabItem.click();
    }
}

export default new UtilitiesPane();
