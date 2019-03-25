const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const webpack = require("webpack");

module.exports = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'BASE_URL': JSON.stringify('https://awesomecmscore.azurewebsites.net/')
            }
        })
    ]
});