import { Toolbox } from './toolbox';

class InfoPane extends Toolbox {
    get CopyButton() {
        return $('[data-testid="dynamics-version"] .copy');
    }

    get GetSupport() {
        return $('[data-testid="get-support"]');
    }

    async getSupport() {
        await this.GetSupport.click();
    }

    async open () {
        return super.open();
    }
}

export default new InfoPane();
