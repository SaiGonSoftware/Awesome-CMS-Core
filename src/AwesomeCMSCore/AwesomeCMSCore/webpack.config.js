const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	entry: {
		common: "./React/js/App/Vendor/common.js",
		login: "./React/js/EntryPoint/Modules/Admin/Account/Login/Login.js",
		password: "./React/js/EntryPoint/Modules/Admin/Account/Password/Password.js",
		manageaccount: "./React/js/EntryPoint/Modules/Admin/Account/Index.js",
		categories: "./React/js/EntryPoint/Modules/Admin/Categories/Categories.js",
		tag: "./React/js/EntryPoint/Modules/Admin/Tag/Tag.js",
		post: "./React/js/EntryPoint/Modules/Admin/Post/Post.js",
		comment: "./React/js/EntryPoint/Modules/Admin/Comment/Comment.js",
		portal: "./React/js/EntryPoint/Modules/Admin/Portal/PortalIndex.js",
		vendor: ['react', 'react-dom']
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, "wwwroot/dist"),
		filename: "[name].js",
		publicPath: "/dist/"
	},
	resolve: {
		extensions: ['.ts', '.tsx'],
		modules: [
			path.resolve('./React/js/App'),
			path.resolve('./node_modules')
		]
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
		}),
		new webpack.HotModuleReplacementPlugin()
	],
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
				test: /\.(ts|tsx)$/,
				loader: ['ts-loader', 'tslint-loader']
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			/* 			{
							test: /\.(js|jsx)$/,
							exclude: /node_modules/,
							loader: ["babel-loader", "eslint-loader"]
						}, */
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