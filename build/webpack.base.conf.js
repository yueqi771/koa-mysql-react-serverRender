const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	target: "web",
	output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist'),
        publicPath: 'http://127.0.0.1:7000/static/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            "@components": path.resolve(__dirname, "../client/components"),
            "@pages": path.resolve(__dirname, "../client/pages"),
            "@style": path.resolve(__dirname, "../static/css"),
            "@images": path.resolve(__dirname, "../client/static/images"),
            "@fonts": path.resolve(__dirname, "../static/fonts"),
            "@utils": path.resolve(__dirname, "../client/utils"),
            '@store': path.resolve(__dirname, "../client/store")
        }
    },
    module: {
        rules: [
            {
				test: /\.js$/,
				loader: "babel-loader",
				exclude: [
		           path.join(__dirname, '../src/static/font/iconfont.js'),
		           path.join(__dirname, '../node_modules'),
                ],
            },
            {
				test: /\.ejs$/,
				loader: "ejs-loader",
            },
			{
				test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				query: {
                    presets: ['react', 'es2015', "stage-1"],
                    plugins: [
                        'transform-decorators-legacy',
                    ],
				}
      		},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'img/[hash:12].[ext]'
				}
      		},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'media/[hash:12].[ext]'
				}
      		},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'fonts/[hash:12].[ext]'
				}
	        }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}