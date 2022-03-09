import { Toolbox } from './toolbox';

class NavigationPane extends Toolbox {
    get NavigationTabItem() {
        return $(`.gotdibbs-tabs [data-to="1"]`);
    }

    get OpenRecordListLink() {
        return $('[data-testid="open-record-list"]');
    }

    get OpenRecordLink() {
        return $('[data-testid="open-record"]');
    }

    get OpenSolutionLink() {
        return $('[data-testid="open-solution"]');
    }

    get RecordLogicalNameInput() {
        return $('[data-testid="recordlogicalname"]');
    }

    get RecordId() {
        return $('[data-testid="recordid"]');
    }

    get SolutionUniqueName() {
        return $('[data-testid="solutionuniquename"]');
    }

    get OpenObject() {
        return $('[data-testid="openobject"]');
    }

    get OpenObjectCancel() {
        return $('[data-testid="openobjectcancel"]');
    }

    async openRecordList(logicalName) {
        await this.OpenRecordListLink.click();

        await this.RecordLogicalNameInput.waitForDisplayed();

        await this.RecordLogicalNameInput.setValue(logicalName)

        await this.OpenObject.click();
    }

    async openRecord(logicalName, id) {
        await this.OpenRecordLink.click();

        await this.RecordLogicalNameInput.waitForDisplayed();
        await this.RecordLogicalNameInput.setValue(logicalName)

        await this.RecordId.setValue(id);

        await this.OpenObject.click();
    }

    async openSolution(solutionUniqueName) {
        await this.OpenSolutionLink.click();

        await this.SolutionUniqueName.waitForDisplayed();
        await this.SolutionUniqueName.setValue(solutionUniqueName)

        await this.OpenObject.click();
    }

    async open() {
        await super.open();

        await this.NavigationTabItem.click();
    }
}

export default new NavigationPane();