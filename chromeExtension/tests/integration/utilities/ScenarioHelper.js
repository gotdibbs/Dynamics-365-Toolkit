module.exports = class ToolboxHelper {
    get ToolboxContainer() {
        return $('.gotdibbs-toolbox');
    }

    get CloseToolboxButton() {
        return $('.gotdibbs-toolbox-close');
    }

    closeToolbox() {
        if (this.ToolboxContainer.isDisplayed()) {
            this.CloseToolboxButton.click();
        }
    }

    navigateHome() {
        const isOnRecordPage = /(etn|etc)/i;

        if (isOnRecordPage.test(browser.getUrl())) {
            // First, try to go back to prevent excessive toolbox script injection in `info` logs
            browser.back();

            if (!isOnRecordPage.test(browser.getUrl())) {
                return;
            }
            else {
                browser.url('/main.aspx?app=d365default&forceUCI=1');
            }
        }
    }
};