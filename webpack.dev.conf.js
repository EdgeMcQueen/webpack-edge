const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
	// настройки для dev
    mode: "development",
    // девтул для source map
    devtool: 'cheap-module-eval-source-map',
	// сервер режима разработчика
	devServer: {
        // путь к dist
        contentBase: baseWebpackConfig.externals.paths.dist,
		// historyApiFallback: true,
		// noInfo: true,
		overlay: {
			warnings: true,
			errors: true,
        },
        // порт
        port: 8081,
    },
    // плагины
    plugins: [
        // source map
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
    ]
});

// экспорт devWebpackConfig
module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig);
});
