const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("cmscore.css");

module.exports = {
  entry: {
    main: "./wwwroot/frontend/js/main.js"
  },
  output: {
    path: path.resolve(__dirname, "wwwroot/dist"),
    filename: "[name].js",
    publicPath: "/dist/"
  },
  plugins: [
    extractCSS,
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "eslint-loader"]
      }
    ]
  },
  watch: true
};
