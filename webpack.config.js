const path = require("path"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
	return {
		entry: "./app/index.js",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "bundle.js",
		},
		resolve: {
			alias: {
				Root: path.resolve(__dirname, "./app"),
				Components: path.resolve(__dirname, "./app/components"),
				Actions: path.resolve(__dirname, "./app/actions"),
				Reducers: path.resolve(__dirname, "./app/reducers"),
				Utils: path.resolve(__dirname, "./app/utils"),
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./app/index.html",
			}),
			new MiniCssExtractPlugin({
				filename: "style.css",
			}),
		],
		module: {
			rules: [
				{
					test: /\.html$/,
					use: "html-loader",
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: options.mode === "development",
							},
						},
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "babel-loader",
							options: {
								presets: ["@babel/preset-env", "@babel/preset-react"],
							},
						},
					],
				},
				{
					test: /\.woff2?/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "fonts",
							},
						},
					],
				},
			],
		},
		devtool: options.mode === "development" ? "eval-source-map" : "",
		devServer: {
			port: 3000,
			host: "0.0.0.0",
			historyApiFallback: true,
			overlay: {
				warnings: true,
				errors: true,
			},
			hot: true,
		},
	};
};
