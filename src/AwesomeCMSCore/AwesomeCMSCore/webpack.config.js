const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TSLintPlugin = require('tslint-webpack-plugin');

const shellScript = [];

function srcPath(subdir) {
    return path.join(__dirname, "React/js/App", subdir);
}

shellScript.push(new WebpackShellPlugin({
	onBuildStart: ['echo "Starting"'],
	onBuildEnd: ['postcss --dir wwwroot/dist wwwroot/dist/*.css']
}));

module.exports = {
	entry: {
		admin: "./React/js/App/Modules/Admin/admin.ts",
		client: "./React/js/App/Modules/Client/client.ts",
		login: "./React/js/EntryPoint/Modules/Admin/Account/Login/Login.ts",
		password: "./React/js/EntryPoint/Modules/Admin/Account/Password/Password.ts",
		manageaccount: "./React/js/EntryPoint/Modules/Admin/Account/Index.ts",
		categories: "./React/js/EntryPoint/Modules/Admin/Categories/Categories.ts",
		tag: "./React/js/EntryPoint/Modules/Admin/Tag/Tag.ts",
		post: "./React/js/EntryPoint/Modules/Admin/Post/Post.ts",
		comment: "./React/js/EntryPoint/Modules/Admin/Comment/Comment.ts",
		portal: "./React/js/EntryPoint/Modules/Admin/Portal/PortalIndex.ts",
		ClientIndex: "./React/js/EntryPoint/Modules/Client/Index/ClientIndex.ts",
		vendor: ['react', 'react-dom']
	},
	output: {
		path: path.resolve(__dirname, "wwwroot/dist"),
		filename: "[name].js",
		publicPath: "/dist/"
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false,
				extractComments: 'all',
				uglifyOptions: {
					compress: true,
					output: null
				}
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					safe: true,
					discardComments: {
						removeAll: true,
					},
				},
			})
		]
	},
	plugins: [
		new TSLintPlugin({
			files: ['./React/js/**/*.ts']
		}),
		new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /jsx$/),
		new webpack.LoaderOptionsPlugin({
			options: {}
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			Popper: ['popper.js', 'default']
		}),
		new CompressionPlugin({
			test: /\.(js|css)/
		}),
		new UglifyJsPlugin(),
		new WebpackShellPlugin({
			onBuildStart: ['echo "Starting"'],
			onBuildEnd: ['postcss --dir wwwroot/dist wwwroot/dist/*.css']
		})
	],
	resolve: {
		extensions: ['.ts', '.tsx'],
		alias: {
            Helper: srcPath('Helper'),
            Common: srcPath('Common'),
            Shared: srcPath('Shared')
        },
		modules: [
/* 			path.resolve('./React/js/App'),
			path.resolve('./React/js/App/Modules/Client'),
			path.resolve('./React/js/App/Modules/Adnmin'),
			path.resolve('./React/js/App/Helper'),
			path.resolve('./React/js/App/Common'),
			path.resolve('./React/js/App/Shared'), */
			path.resolve('./node_modules')
		]
	},
	module: {
		rules: [{
				test: /\.scss$/,
				use: [
					'style-loader',
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
				loader: ['ts-loader']
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