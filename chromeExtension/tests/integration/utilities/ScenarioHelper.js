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
        if (/(etn|etc)/i.test(browser.getUrl())) {
            browser.url('/main.aspx?app=d365default&forceUCI=1');
        }
    }
};