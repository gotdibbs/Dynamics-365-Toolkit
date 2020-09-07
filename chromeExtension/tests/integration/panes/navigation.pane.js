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

    openRecordList(logicalName) {
        this.OpenRecordListLink.click();

        this.RecordLogicalNameInput.waitForDisplayed();

        this.RecordLogicalNameInput.setValue(logicalName)

        this.OpenObject.click();
    }

    openRecord(logicalName, id) {
        this.OpenRecordLink.click();

        this.RecordLogicalNameInput.waitForDisplayed();
        this.RecordLogicalNameInput.setValue(logicalName)

        this.RecordId.setValue(id);

        this.OpenObject.click();
    }

    openSolution(solutionUniqueName) {
        this.OpenSolutionLink.click();

        this.SolutionUniqueName.waitForDisplayed();
        this.SolutionUniqueName.setValue(solutionUniqueName)

        this.OpenObject.click();
    }

    open () {
        super.open();

        this.NavigationTabItem.click();
    }
}

export default new NavigationPane();