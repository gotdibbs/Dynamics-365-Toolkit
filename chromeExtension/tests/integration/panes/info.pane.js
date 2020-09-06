import { Toolbox } from './toolbox';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InfoPane extends Toolbox {
    /**
     * define selectors using getter methods
     */
    get inputUsername () { return $('#username') }
    get inputPassword () { return $('#password') }
    get btnSubmit () { return $('button[type="submit"]') }

    login(username, password) {
        browser.pause(10000);
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open();
    }
}

export default new InfoPane();
