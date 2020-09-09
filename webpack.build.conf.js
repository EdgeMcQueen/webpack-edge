const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const buildWebpackConfig = merge(baseWebpackConfig, {
	// настройки для build
	mode: "production",
	// подключаем плагины
	plugins: [],
});

// экспортируем buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig);
});
