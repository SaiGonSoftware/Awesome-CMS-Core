const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("cmscore.css");

module.exports = {
  entry: "./wwwroot/js/app.js",
  output: {
    path: path.resolve(__dirname, "wwwroot/dist"),
    filename: "bundle.js"
  },
  
  plugins: [extractCSS, new webpack.optimize.UglifyJsPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        loaders: "jshint-loader"
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  watch: true
};
