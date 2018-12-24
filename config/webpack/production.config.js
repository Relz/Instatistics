const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
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
				test: /\.p?css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'typings-for-css-modules-loader',
						options: {
							importLoaders: 1,
							modules: true,
							namedExport: true,
							minimize: true
						}
					},
					'postcss-loader'
				]
			}
		]
	},

	optimization: {
		splitChunks: {
			chunks: 'all',
			minChunks: Infinity
		}
	},

	performance: {
		hints: false
	},

	plugins: [
		new CompressionPlugin()
	]
});
