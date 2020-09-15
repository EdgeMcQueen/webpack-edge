const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

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
		filename: `${PATHS.assets}js/[name].[hash].js`,
		path: PATHS.dist,
		publicPath: "/",
	},
	optimization: {
		splitChunks: {
		  cacheGroups: {
			vendor: {
			  name: 'vendors',
			  test: /node_modules/,
			  chunks: 'all',
			  enforce: true
			}
		  }
		}
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
			// подключаем Vue.js
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loader: {
						scss: 'vue-style-loader!css-loader!sass-loader'
					}
				}
			},
			// подключаем загрузчик для изображений
			{
				test: /\.(png,jpg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: '[name].[ext]'
				}
			},
			// подключаем загрузчик для шрифтов
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
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
	// сокращения корневых пути
	resolve : {
		alias: {
			'~': 'src',
			'vue$': 'vue/dist/vue.js',
		}
	},
	// дополнительные плагины
	plugins: [
		// vue
		new VueLoaderPlugin(),
		// минификатор css
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[hash].css`,
		  }),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			filename: './index.html',
			inject: true // автоматически прописывать пути link и script
		  }),
		// копирование изображений
		new CopyWebpackPlugin({
			patterns: [
				{ from: `${PATHS.src}/${PATHS.assets}/img`, to: `${PATHS.assets}img` },
				{ from: `${PATHS.src}/${PATHS.assets}/fonts`, to: `${PATHS.assets}fonts` },
				{ from: `${PATHS.src}/static`, to: '' },
			]
		})
	],
};