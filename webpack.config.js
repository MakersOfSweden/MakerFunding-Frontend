var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR + '/js',
		publicPath: "/js/",
		filename: 'bundle.js'
	},

	// Development server on http://localhost:8100/
	devServer: {
//		inline: true,
		contentBase: BUILD_DIR,
		port: 8100,
		historyApiFallback: {
			index: "index.html"
		}
	},

	// Include *.js and *.jsx files
	resolve: {
		extensions: [".js", ".jsx"]
	},

	// Preprocess *.jsx files
	module: {
		loaders:
		[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				include: APP_DIR,
				loader: "babel-loader",
				query: {
					presets: ["es2015", "react"]
				}
			},
		],
	},
};

module.exports = config;