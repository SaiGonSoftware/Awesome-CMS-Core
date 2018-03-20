const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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
    new MiniCssExtractPlugin({
      filename: "csmcore.css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: ['popper.js', 'default']
    }),
    new UglifyJsPlugin(),
    new CompressionPlugin({
      test: /\.(js|css)/
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: "file-loader"
      },
      {
        test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
        loader: "file-loader"
      }
    ]
  },
  watch: true
};
