const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist'),
	assets: 'assets/'
}

module.exports = {

	// подключаем пути {ярлык : цель}
	externals: {
		paths: PATHS
	},
	// точка входа
	entry: {
		app: PATHS.src
	},
	// точка выхода :)
	output: {
		filename: `${PATHS.assets}js/[name].js`,
		path: PATHS.dist,
		publicPath: "/",
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
			// подключаем загрузчик для изображений
			{
				test: /\.(png,jpg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: '[name].[ext]'
				}
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
							url: false,
							sourceMap: true,
						},
					},
					// подключаем postcss, конфиг расположен в postcss.config.js
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
						},
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
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				]
			},
		],
	},

	// дополнительные плагины
	plugins: [
		// минификатор css
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].css`,
		  }),
		new HtmlWebpackPlugin({
			hash: false,
			template: `${PATHS.src}/index.html`,
			filename: './index.html'
		  }),
		// копирование изображений
		new CopyWebpackPlugin({
			patterns: [
				{ from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
				{ from: `${PATHS.src}/static`, to: '' },
			]
		})
	],
};