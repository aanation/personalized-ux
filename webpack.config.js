const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const outputDirPath = path.resolve("./build");
const entryPointPath = path.resolve("./src/index.ts");

const devServerHost = "localhost";
const devServerPort = 8080;

const commonConfig = {
	entry: entryPointPath,
	output: {
		path: outputDirPath,
		publicPath: "/",
		filename: "js/[name].[hash].js",
		chunkFilename: "js/[id].[hash].js"
	},
	resolve: {
		extensions: [".js", ".ts",]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
		]
	},
};

const devConfig = merge(commonConfig, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		hot: true,
		hotOnly: true,
		host: devServerHost,
		port: devServerPort,
		historyApiFallback: true
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
});

const prodConfig = merge(commonConfig, {
	mode: "production",
	devtool: false
});

const testConfig = merge(commonConfig, {
	mode: "development",
	devtool: "inline-cheap-module-source-map",
	target: 'node',
	externals: [nodeExternals()],
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
})

switch (process.env.NODE_ENV) {
	case 'development':
		module.exports = devConfig
		break
	case 'test':
		module.exports = testConfig
		break
	default:
		module.exports = prodConfig
}
