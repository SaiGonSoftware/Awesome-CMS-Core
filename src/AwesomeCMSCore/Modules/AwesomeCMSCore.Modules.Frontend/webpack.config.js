const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("cmscore.css");

module.exports = {
    entry:  "./wwwroot/js/app.js",
    output: {
        path: path.resolve(__dirname, "wwwroot/dist"),
        filename: "bundle.js"
    },
    plugins: [
        extractCSS,
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract(["css-loader?minimize"])
            }
        ]
    },
    watch: true
};