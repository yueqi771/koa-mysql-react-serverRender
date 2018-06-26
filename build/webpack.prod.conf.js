const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConf = require('./webpack.base.conf');

module.exports = merge(baseConf, {
    mode: "production",
    entry: {
        app: ["babel-polyfill","./src/main.js"],
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].[chunkhash:8].js",
        publicPath: "./"
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
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: -10,
                    chunks: 'all'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            },
        }
    },
    plugins: [
        // 单独打包css
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),

        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                API_ENV: JSON.stringify("production"),
            }
        }),

        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, '../index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
})
