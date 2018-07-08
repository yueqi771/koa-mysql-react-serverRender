const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	target: "web",
	output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist'),
        publicPath: 'http://127.0.0.1:7000/static/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', ',less'],
        alias: {
            "@components": path.resolve(__dirname, "../client/components"),
            "@pages": path.resolve(__dirname, "../client/pages"),
            "@style": path.resolve(__dirname, "../static/css"),
            "@images": path.resolve(__dirname, "../static/images"),
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
            // {
			// 	test: /\.ejs$/,
			// 	loader: "ejs-compiled-loader!ejs-loader",
            // },
			
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
                    name: 'img/[hash:12].[ext]',
                    publicPath:"/static/"
				}
      		},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
                    name: 'media/[hash:12].[ext]',
                    publicPath:'/static/'
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

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"'
            }
        }),
        
    ]

   
}