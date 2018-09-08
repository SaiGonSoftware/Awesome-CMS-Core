const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    main: "./React/js/main.js",
    common: "./React/js/App/Vendor/common.js",
    login: "./React/js/EntryPoint/Modules/Admin/Account/Login/login.js",
    password: "./React/js/EntryPoint/Modules/Admin/Account/Password/password.js",
    manageaccount: "./React/js/EntryPoint/Modules/Admin/Account/index.js"
  },
  output: {
    path: path.resolve(__dirname, "wwwroot/dist"),
    filename: "[name].js",
    publicPath: "/dist/"
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /jsx$/),
    new webpack.LoaderOptionsPlugin({
      options: {}
    }),
    new MiniCssExtractPlugin({
      filename: "cmscore.css"
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
  resolve: {
    modules: [
      path.resolve('./React/js/App'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [{
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