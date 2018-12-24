const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'cheap-module-source-map',

	devServer: {
		contentBase: './src',
		inline: true,
		quiet: false,
		stats: { colors: true }
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
							sourceMap: true,
							modules: true,
							namedExport: true
						}
					},
					'postcss-loader'
				]
			}
		]
	}
});
