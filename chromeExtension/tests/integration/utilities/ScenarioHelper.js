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
            // First, try to go back to prevent excessive toolbox script injection in `info` logs
            const isBackSuccess = browser.execute(() => {
                try {
                    history.back();
                    return true;
                }
                catch {}
            });

            if (isBackSuccess) {
                return;
            }

            const homeButton = $('[data-id="dynamics-button"]');

            const isHomeSuccess = homeButton.isExisting() &&
                homeButton.isClickable();

            if (isHomeSuccess) {
                homeButton.click();
            }

            // ...if that doesn't work then do a full navigation event
            if (!isHomeSuccess || /(etn|etc)/i.test(browser.getUrl())) {
                browser.url('/main.aspx?app=d365default&forceUCI=1');
            }
        }
    }
};