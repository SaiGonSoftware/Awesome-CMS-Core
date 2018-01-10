const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("cmscore.css");

module.exports = {
  entry: "./wwwroot/js/app.js",
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "wwwroot/dist"),
    filename: "bundle.js"
  },
  plugins: [
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        loaders: "jshint-loader"
      },
      /*{
        test: /\.scss$/,
        //loader: "css-loader!sass-loader"
        loader: ExtractTextPlugin.extract('css-loader?minimize!sass-loader')
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(["css-loader?minimize"])
      }*/
    ]
  },
  watch: true
};
