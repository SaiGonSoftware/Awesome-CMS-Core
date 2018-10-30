const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
	admin: "./React/js/App/Modules/Admin/admin.js",
	client: "./React/js/App/Modules/Client/client.js",
    login: "./React/js/EntryPoint/Modules/Admin/Account/Login/Login.js",
    password: "./React/js/EntryPoint/Modules/Admin/Account/Password/Password.js",
    manageaccount: "./React/js/EntryPoint/Modules/Admin/Account/Index.js",
    categories: "./React/js/EntryPoint/Modules/Admin/Categories/Categories.js",
    tag: "./React/js/EntryPoint/Modules/Admin/Tag/Tag.js",
    post:"./React/js/EntryPoint/Modules/Admin/Post/Post.js",
    comment:"./React/js/EntryPoint/Modules/Admin/Comment/Comment.js",
    portal:"./React/js/EntryPoint/Modules/Admin/Portal/PortalIndex.js"
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
      filename: "admin.css"
	}),
	new MiniCssExtractPlugin({
		filename: "client.css"
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