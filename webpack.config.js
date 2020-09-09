const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		app: "./src/index.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/dist",
	},
// подключаем модули
	module: {
		rules: [
			// подключаем транспайлер современного ES кода на более ранний, конфиг расположен в .babelrc
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: "/node_modules/",
			},
			// подключаем компилятор и загрузчик scss стилей
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					// подключаем postcss, конфиг расположен в postcss.config.js
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			// подключаем загрузчик css стилей
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
	// сервер режима разработчика
	devServer: {
		overlay: true,
	},
	// дополнительные плагины
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
};
