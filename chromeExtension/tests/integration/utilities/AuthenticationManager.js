module.exports = class AuthenticationManager {
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

    login() {
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
    }
};