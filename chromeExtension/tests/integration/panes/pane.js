const fs = require('fs');
const path = require('path');

const script = fs.readFileSync(path.resolve(__dirname, '../../../dist/toolkit.js'));

/**
* main pane object containing all methods, selectors and functionality
* that is shared across all pane objects
*/
export default class Pane {
    get EmailInput() {
        return $('input[type="email"]');
    }

    get PasswordInput() {
        return $('input[name="passwd"]');
    }

    get DoNotRememberMe() {
        return $('input[type="button"][value="No"]');
    }

    get ApplicationShell() {
        return $('#ApplicationShell');
    }

    open() {
        browser.url(process.env.DYNAMICS_URL);
        this.EmailInput.waitForDisplayed();
        this.EmailInput.setValue(process.env.DYNAMICS_USER);
        this.EmailInput.keys('Enter');
        this.PasswordInput.waitForDisplayed();
        this.PasswordInput.setValue(process.env.DYNAMICS_PASSWORD);
        this.PasswordInput.keys('Enter');
        this.DoNotRememberMe.waitForDisplayed();
        this.DoNotRememberMe.click();
        this.ApplicationShell.waitForDisplayed();
        console.log(path.resolve(__dirname, '../../../dist/toolkit.js'));
        browser.executeAsyncScript(script);
        $('.gotdibbs-toolbox').waitForDisplayed();
    }
}
