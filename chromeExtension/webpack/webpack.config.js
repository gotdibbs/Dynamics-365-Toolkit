const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const currentEnv = dotenv.config({ path: path.resolve(__dirname, '..', '.env') }).parsed;

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.js'),
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'toolkit.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [ExtractCssChunks.loader,
                    'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin(Object.keys(currentEnv)),
        new ExtractCssChunks({
            filename: 'toolkit.css'
        })
    ]
};