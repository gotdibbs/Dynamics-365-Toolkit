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
        const isOnRecordPage = /(etn|etc)/i;

        if (isOnRecordPage.test(await browser.getUrl())) {
            // First, try to go back to prevent excessive toolbox script injection in `info` logs
            await browser.back();

            if (!isOnRecordPage.test(await browser.getUrl())) {
                return;
            }
            else {
                await browser.url('/main.aspx?app=d365default&forceUCI=1');
            }
        }
    }
};