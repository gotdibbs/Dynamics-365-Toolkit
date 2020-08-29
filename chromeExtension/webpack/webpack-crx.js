// Inspired by https://github.com/galshilo/webpack-crx
// TODO: migrate to crx3: https://www.npmjs.com/package/crx3
const fs = require('fs');
const path = require('path');
const ChromeExtension = require('crx');

function WebpackCrxPlugin(options) {
    this.options = options || {};
    this.outputFileName = `${options.name || 'packed'}.crx`;

    if (this.options.key) {
        this.key = path.resolve(__dirname, options.key);
    }
    else {
        throw new Error('Key is required. Generate one by packing the extension one time in Chrome first');
    }

    this.src = path.resolve(__dirname, this.options.src);
    this.dest = path.resolve(__dirname, this.options.dest);
    this.updateFile = path.resolve(__dirname, this.dest, options.updateFile || 'update.xml');
    this.crxFile = path.resolve(__dirname, path.join(this.dest, this.outputFileName));
    this.version = options.version || 3;
}

WebpackCrxPlugin.prototype.apply = function (compiler) {
    let self = this;
    return compiler.hooks.done.tap('DoPack', function DoPack() {
        self.pack.call(self);
    });
};

WebpackCrxPlugin.prototype.pack = function () {
    const crx = new ChromeExtension({
        codebase: `http://localhost:8000/${this.outputFileName}`,
        privateKey: fs.readFileSync(this.key),
        version: this.version
    });

    crx.load(this.src)
        .then(crx => crx.pack())
        .then(crxBuffer => {
            const updateXML = crx.generateUpdateXML();
            if (!fs.existsSync(this.dest)) {
                fs.mkdirSync(this.dest);
            }
            fs.writeFileSync(this.updateFile, updateXML);
            console.info(`Saving CRX file to ${this.crxFile}`);
            fs.writeFileSync(this.crxFile, crxBuffer);
        })
        .catch(err => {
            console.error(err);
        });
};

module.exports = WebpackCrxPlugin;