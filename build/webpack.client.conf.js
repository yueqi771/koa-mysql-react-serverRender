const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        app: [
            // 'react-hot-loader/patch',
            path.join(__dirname, '../client/main.js')
        ]
    },

    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: "js/[name].js"
    },
    
    module: {
        rules: [{
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }]
    },
    devtool: "#cheap-module-eval-source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('develop'),
                API_ENV: JSON.stringify('devalop'),
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
            inject: true
        }),


    ],

    devServer: {
        // publicPath: '/static/',
        port: '7000',
        hot: true,
        // 编译出错的时候，在浏览器页面上显示错误
        overlay: {
            errors: true,
        },
        // 解决history模式下刷新页面， 路由挂了
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://dc.mixtmt.com:9619",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        },

    }
})