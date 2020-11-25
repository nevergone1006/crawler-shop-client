/* eslint-disable no-useless-escape */

const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
	SRC: path.resolve(__dirname, 'src'),
	DIST: path.resolve(__dirname, 'build'),
	STATIC: path.resolve(__dirname, 'public'),
	HTML_INDEX: path.resolve(__dirname, 'public/index.html'),
};

const config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, paths.DIST),
		filename: 'app.[hash].js',
		chunkFilename: '[name].bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				],
				exclude: /\.module\.css$/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
				],
				include: /\.module\.css$/
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							'@babel/plugin-syntax-dynamic-import'
						]
					}
				}
			},
			{
				test: /\.svg$/,
				use: 'file-loader'
			},
			{
				test: /\.(eot|otf|ttf|woff|woff2)$/,
				use: 'file-loader',
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// Inline files smaller than 10 kB
							limit: 10 * 1024,
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								enabled: false,
								// NOTE: mozjpeg is disabled as it causes errors in some Linux environments
								// Try enabling it in your environment by switching the config to:
								// enabled: true,
								// progressive: true,
							},
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 7,
							},
							pngquant: {
								quality: '65-90',
								speed: 4,
							},
						},
					},
				],
			},
			// {
			// 	test: /\.png$/,
			// 	use: [{
			// 		loader: 'url-loader',
			// 		options: {
			// 			mimetype: 'image/png'
			// 		}
			// 	}]
			// }
		]
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
		modules: [paths.SRC, 'node_modules'],
	},
	devServer: {
		compress: true,
		port: 3000,
		host: '0.0.0.0',
		historyApiFallback: true,
		publicPath: '/',
		contentBase: paths.STATIC
	},
	plugins: [
		new LodashModuleReplacementPlugin,
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, paths.HTML_INDEX),
		})
	],
	// optimization: {
	// 	runtimeChunk: 'single',
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				test: /[\\\/]node_modules[\\\/]/,
	// 				name: 'vendors',
	// 				chunks: 'all'
	// 			}
	// 		}
	// 	}
	// }
};

module.exports = config;
