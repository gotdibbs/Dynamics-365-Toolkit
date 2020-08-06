const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.js'),
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'toolkit.js'
    },
    module: {
           rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};