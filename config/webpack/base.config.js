const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, '../../src'),

	node: {
		fs: 'empty',
		net: 'empty'
	},

	entry: './index.tsx',

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.css']
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: 'ts-loader'
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: 'url-loader?limit=10000'
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'font/[name].[ext]'
				}
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'assets/index.html',
			inject: 'body'
		})
	]
};
