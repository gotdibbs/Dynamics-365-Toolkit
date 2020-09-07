import { Toolbox } from './toolbox';

class UtilitiesPane extends Toolbox {
    get UtilitiesTabItem() {
        return $(`.gotdibbs-tabs [data-to="2"]`);
    }

    get CopyRecordId() {
        return $('[data-testid="copy-record-id"]');
    }

    get CopyRecordLink() {
        return $('[data-testid="copy-record-link"]');
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

    open () {
        super.open();

        this.UtilitiesTabItem.click();
    }
}

export default new UtilitiesPane();
