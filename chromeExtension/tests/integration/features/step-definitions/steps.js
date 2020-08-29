import { Given, When, Then } from 'cucumber';

import InfoPane from '../../panes/info.pane';

const panes = {
    info: InfoPane
};

Given(/^I am on the (\w+) pane$/, async (pane) => {
    await panes[pane].open();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await InfoPane.login(username, password);
});

// Then(/^I should see a flash message saying (.*)$/, async (message) => {
//     await expect(SecurePage.flashAlert).toBeExisting();
//     await expect(SecurePage.flashAlert).toHaveTextContaining(message);
// });

