config = {
	entry: './main.js',

	output: {
		//path:'C:\\CMADCW\\UI\\React',
		path:'C:\\CMADCW\\cmad-t9bloggerV3\\src\\main\\webapp',
		filename: 'index.js'
	},

	devServer: {
		inline: true,
		port: 9000
	},

	module: {
		loaders: [
		{
			test: /.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}
	]
}
}
module.exports = config;
