const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf');


module.exports = merge(baseWebpackConfig, {
    mode: "development",
    // js打包出来的内容使用于哪个执行环境
    target: "node",

    entry: {
        app: [
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
        publicPath: 'http://127.0.0.1:7000/static/',
        // 打包出来的js的模块化方案
        libraryTarget: "commonjs2"
    },

    module: {
        rules: [
            {
                test:/\.less/,
                use:ExtractTextPlugin.extract({
                    use: ["css-loader", "less-loader"],
                    fallback:"style-loader"
                })
            },
            {
                test:/\.css/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },  
        ]
    },
    plugins: [
        // 单独打包css
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),

        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        // }),

    ],

})