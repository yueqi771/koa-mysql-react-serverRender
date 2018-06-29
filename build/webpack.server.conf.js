const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    // js打包出来的内容使用于哪个执行环境
    target: "node",

    entry: {
        app: [
            "babel-polyfill",
            // 'react-hot-loader/patch',
            path.join(__dirname, '../client/server-entry.js')
        ]
    },

    // webpack打包的时候不加入打包的依赖
    externals: Object.keys(require('../package.json').dependencies),

    // 出口
    output: {
        // 打包出来的名字
        filename: "server-entry.js",
        path: path.join(__dirname, '../dist'),
        publicPath: '/static',
        // 打包出来的js的模块化方案
        libraryTarget: "commonjs2"
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_BASE': JSON.stringify('http://127.0.0.1:3000')
        }),
        // new HtmlWebpackPlugin({
		// 	template: '!!ejs-compiled-loader!' + path.join(__dirname, '../server.template.ejs'),
		// })
    ]
})