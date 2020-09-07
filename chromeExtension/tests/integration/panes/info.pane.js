import { Toolbox } from './toolbox';

class InfoPane extends Toolbox {
    get CopyButton() {
        return $(`[data-testid="dynamics-version"] .copy`);
    }

    open () {
        return super.open();
    }
}

export default new InfoPane();
