const path = require('path');

module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-import'),
		require('postcss-mixins')({
			mixinsFiles: path.join(__dirname, '../src/Style', '(mixin.pcss)')
		}),
		require('postcss-nested'),
		require('postcss-advanced-variables')({
			importPaths: ['src/Style/variables']
		}),
		require('postcss-math'),
		require('postcss-color-function'),
		require('precss')
	]
};
