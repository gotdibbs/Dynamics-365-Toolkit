const fs = require('fs');
const path = require('path');
const ScenarioHelper = require('../utilities/ScenarioHelper');

const script = fs.readFileSync(path.resolve(__dirname, '../../../dist/toolkit.js'))
    .toString();
const css = fs.readFileSync(path.resolve(__dirname, '../../../dist/toolkit.css'))
    .toString();

class Toolbox {
    get ToolboxContainer() {
        return $('.gotdibbs-toolbox');
    }

    get Header() {
        return $('.gotdibbs-toolbox-header');
    }

    get Version() {
        return $('.gotdibbs-toolbox-header small');
    }

    get ToggleButton() {
        return $('.gotdibbs-toolbox-collapse');
    }

    get CloseButton() {
        return $('.gotdibbs-toolbox-close');
    }

    async open() {
        const didReload = await browser.execute(() => {
            try {
                if (window.__GOTDIBBS_TOOLBOX__ && window.__GOTDIBBS_TOOLBOX__.load) {
                    window.__GOTDIBBS_TOOLBOX__.load();
                    return true;
                }
            }
            catch {}
        });

        if (!didReload) {
            await browser.execute((cssString) => {
                const style = document.createElement('style');
                style.textContent = cssString;
                document.head.append(style);
            }, css);
            await browser.execute(script, []);

            if (!(await this.ToolboxContainer.isDisplayed())) {
                await this.ToolboxContainer.waitForDisplayed();
            }
        }
    }

    async close() {
        await (new ScenarioHelper().close());
    }
}

export default new Toolbox();

export { Toolbox };