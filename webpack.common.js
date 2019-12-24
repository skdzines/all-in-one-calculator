const path = require('path');
const application = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		application: './index.js'
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(__dirname, './src')
		]
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}, {
			test: /\.(mov|mp4|mkv)$/,
			use: ['file-loader?name=video/[name].[ext]']
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader?name=images/[name].[ext]']
		}, {
			test: /\.(woff|woff2|eot|[ot]tf)$/,
			use: ['file-loader?name=fonts/[name].[ext]']
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['public']),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
			chunkFilename: "[name].[id].css"
		}),
		new HtmlWebpackPlugin({
			inject: false,
			template: require('html-webpack-template'),
			title: application.name,
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0'
				}
			],
			lang: 'en-US'
		})
	],
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'public'),
		publicPath: ''
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '.',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/
				},
				default: {
					minChunks: 2,
					reuseExistingChunk: true
				}
			}
		}
	}
};
