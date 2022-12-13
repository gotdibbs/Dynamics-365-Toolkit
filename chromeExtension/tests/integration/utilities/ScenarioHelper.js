const { GherkinDocumentParser } = require("@cucumber/cucumber/lib/formatter/helpers");

module.exports = class ToolboxHelper {
    get ToolboxContainer() {
        return $('.gotdibbs-toolbox');
    }

    get CloseToolboxButton() {
        return $('.gotdibbs-toolbox-close');
    }

    async closeToolbox() {
        if (await this.ToolboxContainer.isDisplayed()) {
            await this.CloseToolboxButton.click();
        }
    }

    async navigateHome() {
        const isOnRecordPage = /entityrecord/i;

        if (isOnRecordPage.test(await browser.getUrl())) {
            // First, try to go back to prevent excessive toolbox script injection in `info` logs
            await browser.back();

            // If we're still on a record page, force nav back to home
            if (!isOnRecordPage.test(await browser.getUrl())) {
                return;
            }
            else {
                await browser.url('/');
            }
        }
    }
};