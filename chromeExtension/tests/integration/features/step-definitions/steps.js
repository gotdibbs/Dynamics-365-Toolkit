import { Given, When, Then } from 'cucumber';
import Package from '../../../../package.json';

import Panes from '../../panes';

// US Dollar - this may fail, but you can point it to another record in your test environment
const RECORD_LOGICAL_NAME = 'transactioncurrency';
const RECORD_ID = '0202afa1-a6c3-ea11-a812-000d3a579b7d'.toLowerCase();
const RECORD_ATTRIBUTE = 'currencyname';
const SOLUTION_NAME = 'default';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function loadNewRecord() {
    let isSuccess = browser.execute(logicalName => {
        try {
            Xrm.Utility.openEntityForm(logicalName);
            return true;
        }
        catch {}
    }, RECORD_LOGICAL_NAME);

    if (!isSuccess) {
        // Backup, but noisy to the `info` logs as toolkit needs to be re-injected
        browser.url(`/main.aspx?pagetype=entityrecord&etn=${RECORD_LOGICAL_NAME}`);
    }

    Panes.Dynamics.FormHeader.waitForDisplayed();
}

function loadRecord() {
    let isSuccess = browser.execute((logicalName, id) => {
        try {
            Xrm.Utility.openEntityForm(logicalName, id);
            return true;
        }
        catch {}
    }, RECORD_LOGICAL_NAME, RECORD_ID);

    if (!isSuccess) {
        // Backup, but noisy to the `info` logs as toolkit needs to be re-injected
        browser.url(`/main.aspx?pagetype=entityrecord&etn=${RECORD_LOGICAL_NAME}&id=${RECORD_ID}`);
    }

    Panes.Dynamics.FormHeader.waitForDisplayed();
}

function loadPane(pane, isViewingRecord) {
    if (pane == 'default') {
        pane = 'toolbox';
    }

    Panes[capitalize(pane)].open();

    if (!isViewingRecord) {
        return;
    }

    if (/new/i.test(isViewingRecord)) {
        loadNewRecord();
    }
    else {
        loadRecord();
    }
}

Given(/i am on the (\w+) pane( and viewing a record| and viewing a new record)?/i, loadPane);

Given(/i am viewing a record/i, loadRecord);

Given(/i am viewing a new record/i, loadNewRecord);

When(/i drag the header/i, () => {
    Panes.Toolbox.Header.dragAndDrop({ x: 100, y: 100 });
});

When(/i am viewing the (\w+) pane/i, loadPane);

When(/i click on the (.+) (button|link)( again)?/i, (buttonText, type, again) => {
    let button = null;

    switch (buttonText) {
        case 'toggle':
            button = Panes.Toolbox.ToggleButton;
            break;
        case 'close':
            button = Panes.Toolbox.CloseButton;
            break;
        case 'copy':
            button = Panes.Info.CopyButton;
            break;
        default:
            button = $(`[data-testid="${buttonText}"]`);
            break;
    }

    if (button == null) {
        console.error(`Button ${button} could not be interpreted as an actual control`);
        return;
    }

    button.click();
    if (again) {
        button.click();
    }
});

When(/i invoke the (.+) action/i, (action) => {
    if (action === 'open-record-list') {
        Panes.Navigation.openRecordList(RECORD_LOGICAL_NAME);
    }
    else if (action === 'open-record') {
        Panes.Navigation.openRecord(RECORD_LOGICAL_NAME, RECORD_ID);
    }
    else if (action === 'open-solution') {
        Panes.Navigation.openSolution(SOLUTION_NAME);
    }
    else if (action === 'copy-record-id') {
        Panes.Utilities.copyRecordId();
    }
    else if (action === 'copy-record-link') {
        Panes.Utilities.copyRecordLink();
    }
    else if (action === 'focus-field') {
        Panes.Utilities.focusField(RECORD_ATTRIBUTE);
    }
    else if (action === 'toggle-schema-names') {
        Panes.Utilities.toggleSchemaNames(RECORD_ATTRIBUTE);
    }
    else if (action === 'open-ribbon-debugger') {
        Panes.Utilities.openCommandChecker();
    }
    else if (action === 'populate-required-fields') {
        Panes.Utilities.populateRequiredFields();
    }
    else if (action === 'get-support') {
        Panes.Info.getSupport();
    }
    else if (action === 'show-entity-data') {
        Panes.Utilities.showEntityData();
    }
    else if (action === 'enable-all-fields') {
        Panes.Utilities.unlockAllFields();
    }
    else if (action === 'show-all-fields') {
        Panes.Utilities.showAllFields();
    }
    else if (action === 'show-dirty-fields') {
        Panes.Utilities.showDirtyFields();
    }
    else {
        throw new Error('Unsupported action: ' + action);
    }
});

When(/i disable a field/i, () => {
    Panes.Utilities.disableField(RECORD_ATTRIBUTE);
});

When(/i hide a field/i, () => {
    Panes.Utilities.hideField(RECORD_ATTRIBUTE);
});

When(/i change a field/i, () => {
    Panes.Utilities.changeField(RECORD_ATTRIBUTE);
});

Then(/i should see the correct version number/i, () => {
    expect(Panes.Toolbox.Version).toHaveText('v' + Package.version);
});

Then(/the toolbox display state should be (\w+)/i, state => {
    if (state === 'collapsed') {
        browser.waitUntil(() => Panes.Toolbox.ToolboxContainer.getSize('height') <= 100);
        expect(Panes.Toolbox.ToggleButton).toHaveElementClass(state);
    }
    else if (state === 'expanded') {
        browser.waitUntil(() => Panes.Toolbox.ToolboxContainer.getSize('height') > 100);
        expect(Panes.Toolbox.ToggleButton).not.toHaveElementClass('collapsed');
    }
    else if (state === 'closed') {
        expect(Panes.Toolbox.ToolboxContainer).not.toExist();
    }
});

Then(/the toolbox should change position/i, () => {
    expect(Panes.Toolbox.ToolboxContainer.getCSSProperty('top').parsed.value).toBeGreaterThanOrEqual(100);
});

Then(/i should see a value for these fields/i, (table) => {
    table.rawTable.forEach(fields => {
        const field = fields[0];

        const valueElement = $(`[data-testid="${field}"] span`);
        expect(valueElement).toExist();

        const text = valueElement.getText();
        expect(text).not.toBeNull();
        expect(text.trim()).not.toBe('');
    });
});

Then(/i should not see a value for these fields/i, (table) => {
    table.rawTable.forEach(fields => {
        const field = fields[0];

        const valueElement = $(`[data-testid="${field}"] span`);
        expect(valueElement).not.toExist();
    });
});

Then(/i should see each field display the correct value/i, (table) => {
    table.rawTable.forEach(fields => {
        const field = fields[0];

        const valueElement = $(`[data-testid="${field}"] span`);
        expect(valueElement).toExist();

        const text = valueElement.getText()?.toLowerCase();

        switch (field) {
            case 'record-id':
                expect(text).toMatch(RECORD_ID);
                break;
            case 'logical-name':
                expect(text).toMatch(RECORD_LOGICAL_NAME);
                break;
        }
    });
});

Then(/i should see each field display a link to the correct entity/i, (table) => {
    table.hashes().forEach(({ field, entity }) => {
        const valueElement = $(`[data-testid="${field}"] span`);
        expect(valueElement).not.toExist();

        const linkElement = $(`[data-testid="${field}"] a`);
        expect(linkElement).toExist();

        const link = linkElement.getAttribute('href');

        switch (field) {
            case 'user-name':
                expect(link).toMatch(/etn=systemuser/i);
                break;
            case 'security-roles':
                expect(link).toMatch(/biz\/roles\/edit/);
                break;
        }
    });
});

Then(/i should have copied the correct value/i, () => {
    const valueElement = $(`[data-testid="dynamics-version"] span`);
    expect(valueElement).toExist();
    const expectedText = valueElement.getAttribute('data-value');

    browser.execute(() => {
        let elem = document.createElement('input');
        elem.type = 'text';
        elem.id = 'gotdibbs-test-fixture';
        document.body.appendChild(elem);
    }, []);

    const inputFixture = $('#gotdibbs-test-fixture');
    // https://twitter.com/webdriverio/status/812034986341789696?lang=en
    inputFixture.setValue(['Shift', 'Insert']);

    const actualText = inputFixture.getValue();

    expect(actualText).toMatch(expectedText);

    browser.execute(() => {
        document.getElementById('gotdibbs-test-fixture').remove();
    }, []);
});

Then(/i should have copied the (.+) to my clipboard/i, (valueType) => {
    browser.execute(() => {
        let elem = document.createElement('input');
        elem.type = 'text';
        elem.id = 'gotdibbs-test-fixture';
        document.body.appendChild(elem);
    }, []);

    const inputFixture = $('#gotdibbs-test-fixture');
    // https://twitter.com/webdriverio/status/812034986341789696?lang=en
    inputFixture.setValue(['Shift', 'Insert']);

    const actualText = inputFixture.getValue();

    let matcher = null;

    switch (valueType) {
        case 'record id':
            matcher = new RegExp(RECORD_ID, 'i');
            break;
        case 'record url':
            matcher = new RegExp(`etn=${RECORD_LOGICAL_NAME}&id=[{]?${RECORD_ID}[}]?`, 'i');
            break;
    }

    expect(actualText).toMatch(matcher);

    browser.execute(() => {
        document.getElementById('gotdibbs-test-fixture').remove();
    }, []);
});

Then(/a new window should open to show the (.+) (editor|list|page)$/i, (component, type) => {
    const currentWindow = browser.getWindowHandle();

    if (component === 'record' && type === 'list') {
        browser.switchWindow(new RegExp(`etn=${RECORD_LOGICAL_NAME}`));
    }
    else if (component === 'record' && type === 'editor') {
        browser.switchWindow(new RegExp(`id=${RECORD_ID}`));
    }
    else {
        throw new Error(`Couldn't find ${component}/${type}`);
    }

    browser.execute(() => window.close());
    browser.switchToWindow(currentWindow);
});

// Copied from webdriver.io source, but modified to handle nulls
function switchWindow(urlOrTitleToMatch) {
    if (typeof urlOrTitleToMatch !== 'string' && !(urlOrTitleToMatch instanceof RegExp)) {
        throw new Error('Unsupported parameter for switchWindow, required is "string" or an RegExp');
    }

    const tabs = browser.getWindowHandles();

    for (const tab of tabs) {
        browser.switchToWindow(tab)

        /**
         * check if url matches
         */
        browser.waitUntil(() => browser.getUrl());
        const url = browser.getUrl();
        if (url.match(urlOrTitleToMatch)) {
            return tab;
        }

        /**
         * check title
         */
        browser.waitUntil(() => browser.getTitle());
        const title = browser.getTitle();
        if (title.match(urlOrTitleToMatch)) {
            return tab;
        }
    }

    throw new Error(`No window found with title or url matching "${urlOrTitleToMatch}"`)
}

Then(/a new window should open with "(.+)" in the (title|url)$/i, (title, matchType) => {
    const currentWindow = browser.getWindowHandle();

    browser.waitUntil(() => browser.getWindowHandles().length > 1);

    // The title will be 'Microsoft Dynamics 365' until the page loads, so it is
    //  safe to wait for that title to transition, but then we need to wait for the
    //  the actual title to be present to pass the vibe check
    switchWindow(new RegExp(`(${title})|(^Microsoft Dynamics 365)`, 'i'));
    browser.waitUntil(() => new RegExp(title).test(browser.getTitle()));

    browser.execute(() => window.close());
    browser.switchToWindow(currentWindow);
});

Then(/the field i disabled is reenabled/i, () => {
    const isDisabled = browser.execute(field => {
        return window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getControl(field).getDisabled();
    }, RECORD_ATTRIBUTE);

    expect(isDisabled).toBe(false);
});

Then(/the field specified should have received focus/i, () => {
    browser.waitUntil(() => {
        return browser.execute(field => {
            return document.querySelector(`[data-id="${field}"] input`) === document.activeElement;
        }, RECORD_ATTRIBUTE);
    });
});

Then(/the field i hid should now be visible/i, () => {
    browser.waitUntil(() => {
        return browser.execute(field => {
            return window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getControl(field).getVisible();
        }, RECORD_ATTRIBUTE);
    });
});

Then(/i see an alert with the field i changed listed/i, () => {
    browser.waitUntil(() => browser.getAlertText());

    expect(browser.getAlertText()).toMatch(new RegExp(RECORD_ATTRIBUTE, 'i'));

    browser.acceptAlert();

    // Cleanup
    Panes.Utilities.changeFieldBack(RECORD_ATTRIBUTE);
});

Then(/i see the schema names for fields on the form/i, () => {
    $('label*=' + RECORD_ATTRIBUTE).waitForDisplayed();

    Panes.Utilities.toggleSchemaNames();
});

Then(/i see the command checker/i, () => {
    Panes.Utilities.CommandChecker.waitForDisplayed();
});

Then(/all required fields are populated/i, () => {
    const areAllFieldsPopulated = browser.execute(() => {
        let result = true;

        window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.data.entity.attributes.forEach(a => {
            if (a.getRequiredLevel() !== 'required') {
                return;
            }

            result = result && a.getValue() != null;

            // cleanup as we go to prevent dealing with super ugly unsaved changes workflow
            a.setValue(null);
            a.setSubmitMode('never');
        });

        return result;
    });

    expect(areAllFieldsPopulated).toBe(true);
});

Then(/i see a modal with the entity data/i, () => {
    Panes.Utilities.CloseShowEntityDataModal.waitForDisplayed();

    $('span*=statecode').waitForDisplayed();

    Panes.Utilities.CloseShowEntityDataModal.click();
});