var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });



module.exports = {
	devtool: 'cheap-module-eval-source-map',
	devServer: {
        historyApiFallback:{
            index:'build/index.html'
        },
    },
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080/',
		'webpack/hot/only-dev-server',
		'./dev/js/index.js'
	],
	output: {
		path: path.join(__dirname, 'src'),
		filename: 'js/bundle.min.js',
		publicPath: '/src/'
	},
	resolve: {
		modulesDirectories: ['node_modules', 'src'],
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{
		        test: /\.json$/,
		        loader: 'json-loader'
		    },
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};