const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            "@components": path.resolve(__dirname, "../client/components"),
            "@pages": path.resolve(__dirname, "../client/pages"),
            "@style": path.resolve(__dirname, "../static/css"),
            "@images": path.resolve(__dirname, "../client/static/images"),
            "@fonts": path.resolve(__dirname, "../static/fonts"),
            "@utils": path.resolve(__dirname, "../client/utils"),
            '@actions': path.resolve(__dirname, "../client/actions"),
            '@reducers': path.resolve(__dirname, "../client/reducers")
        }
    },
    module: {
        rules: [
            {
				test: /\.js$/,
				loader: "babel-loader",
				exclude: [
		          path.resolve(__dirname, '../src/static/font/iconfont.js'),
		          path.resolve(__dirname, '../node_modules'),
		        ],
      		},
			{
				test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
                    "css-loader"
                ]
            },
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', "stage-0"]
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