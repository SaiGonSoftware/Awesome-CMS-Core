const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("cmscore.css");
const whatwgfetch = require("whatwg-fetch");
module.exports = {
  entry: {
    whatwgfetch: "whatwg-fetch",
    app: "./wwwroot/js/app.js",
    login: "./wwwroot/js/React/Account/LoginForm.js"
  },
  output: {
    path: path.resolve(__dirname, "wwwroot/dist"),
    filename: "[name].js"
  },
  plugins: [extractCSS, new webpack.optimize.UglifyJsPlugin()],
  module: {
    loaders: [
      /* {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        loaders: "jshint-loader"
      }, */
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  watch: true
};
