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

    async login() {
        await browser.url(process.env.DYNAMICS_URL);
        await this.EmailInput.waitForDisplayed();
        await this.EmailInput.setValue(process.env.DYNAMICS_USER);
        await this.EmailInput.keys('Enter');

        await this.PasswordInput.waitForDisplayed();
        await this.PasswordInput.setValue(process.env.DYNAMICS_PASSWORD);
        await this.PasswordInput.keys('Enter');

        await this.DoNotRememberMe.waitForDisplayed();
        await this.DoNotRememberMe.click();

        await this.ApplicationShell.waitForDisplayed();
    }
};