const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'cheap-module-source-map',

	devServer: {
		contentBase: path.join(__dirname, '../../src'),
		inline: true,
		quiet: false,
		stats: { colors: true },
		hot: true,
		noInfo: false
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
							sourceMap: true
						}
					},
					'postcss-loader'
				]
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});
