import { Given, When, Then } from 'cucumber';
import Package from '../../../../package.json';

import Panes from '../../panes';

// US Dollar - this may fail, but you can point it to another record in your test environment
const RECORD_LOGICAL_NAME = 'transactioncurrency';
const RECORD_ID = '0202afa1-a6c3-ea11-a812-000d3a579b7d'.toLowerCase();

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function loadPane(pane) {
    if (pane == 'default') {
        pane = 'toolbox';
    }

    Panes[capitalize(pane)].open();
}

Given(/i am on the (\w+) pane/i, loadPane);

Given(/i am viewing a record/i, () => {
    browser.url(`/main.aspx?pagetype=entityrecord&etn=${RECORD_LOGICAL_NAME}&id=${RECORD_ID}`);
    $('[data-id="form-header"]').waitForDisplayed();
});

When(/i click on the (\w+) button( again)?/i, (buttonText, again) => {
    let button = null;

    switch (buttonText) {
        case 'toggle':
            button = Panes.Toolbox.ToggleButton;
            break;
        case 'close':
            button = Panes.Toolbox.CloseButton;
            break;
        case 'copy':
            button = $(`[data-testid="dynamics-version"] .copy`);
            break;
        default:
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

When(/i drag the header/i, () => {
    Panes.Toolbox.Header.dragAndDrop({ x: 100, y: 100 });
});

When(/i am viewing the (\w+) pane/i, loadPane);

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

Then(/i should see a value displayed for (.*)$/i, (field) => {
    const valueElement = $(`[data-testid="${field}"] span`);
    expect(valueElement).toExist();

    const text = valueElement.getText();
    expect(text).not.toBeNull();
    expect(text.trim()).not.toBe('');
});

Then(/i should not see a value displayed for (.*)$/i, (field) => {
    const valueElement = $(`[data-testid="${field}"]`);
    expect(valueElement).not.toExist();
});

Then(/i should see (.*) display the correct value/i, (field) => {
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

Then(/i should see (.*) display a link to (.*)$/i, (field, entity) => {
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

Then(/i should have copied the correct value/i, () => {
    // Wait for "Copied!" display effect to go away
    browser.pause(1100);

    const valueElement = $(`[data-testid="dynamics-version"] span`);
    expect(valueElement).toExist();
    const expectedText = valueElement.getText();

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