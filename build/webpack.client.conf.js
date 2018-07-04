const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        app: [
            // "babel-polyfill",
            // 'react-hot-loader/patch',
            path.join(__dirname, '../client/main.js')
        ]
    },

    output: {
        path: path.join(__dirname, '../dist'),
        filename: "js/[name].js"
    },
    
    module: {
        rules: [
            {
                test:/\.less/,
				loader: "style-loader!css-loader!less-loader",
            },
            {
                test:/\.css/,
				loader: "style-loader!css-loader",
            },  
        ]
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

        // 单独打包css
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
            inject: true
        }),

        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!' + path.join(__dirname,'../server.template.ejs'),
            filename: 'server.ejs',
            inject: true,
        })
    ],

    devServer: {
        publicPath: '/static',
        port: '7000',
        hot: true,
        // 服务器根目录为打包出来的dist文件夹
        contentBase:path.resolve(__dirname,'../dev_dist'),
        // 编译出错的时候，在浏览器页面上显示错误
        overlay: {
            errors: true,
        },
        // 解决history模式下刷新页面， 路由挂了
        historyApiFallback: {
            index: '/static/index.html'
        },
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        },

    }
})