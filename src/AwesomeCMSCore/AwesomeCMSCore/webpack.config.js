const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("cmscore.css");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    main: "./React/js/main.js"
  },
  output: {
    path: path.resolve(__dirname, "wwwroot/dist"),
    filename: "[name].js",
    publicPath: "/dist/"
  },
  plugins: [
    extractCSS,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: ['popper.js', 'default']
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      test: /\.(js|css)/
    })
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
