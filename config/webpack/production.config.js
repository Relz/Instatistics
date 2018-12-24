const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(baseConfig, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../../build'),
		filename: '[name].bundle.[chunkhash].js'
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					'postcss-loader'
				]
			}
		]
	},

	optimization: {
		minimizer: [new UglifyJsPlugin()]
	},

	performance: {
		hints: false
	},

	plugins: [new CompressionPlugin()]
});
