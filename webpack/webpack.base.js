/**
 * @author sonnguyen
 */
const path = require('path');
const paths = {
	SRC: path.resolve(process.cwd(), 'src'),
	SRC_COMPONENTS: path.resolve(process.cwd(), 'src/components'),
	SRC_CONTAINERS: path.resolve(process.cwd(), 'src/containers'),
	SRC_SERVICES: path.resolve(process.cwd(), 'src/services'),
	SRC_MODELS: path.resolve(process.cwd(), 'src/models'),
	SRC_PAGES: path.resolve(process.cwd(), 'src/pages'),
	DIST: path.resolve(process.cwd(), 'build'),
};

module.exports = options => ({
	context: paths.SRC,
	mode: options.mode,
	entry: './index.js',
	output: {
		path: paths.DIST,
		publicPath: '/',
		...options.output,
	},
	devtool: options.devtool,
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader'
				}]
			},
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
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true,
						}
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
						}
					}
				]
			},
			{
				test: /\.less$/,
				include: /node_modules/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: false,
						}
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
						}
					}
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
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.resolve(process.cwd(), 'src'),
			'node_modules'
		],
		mainFields: ['browser', 'main', 'jsnext:main'],
		alias: {
			'@': paths.SRC,
			'@components': paths.SRC_COMPONENTS,
			'@containers': paths.SRC_CONTAINERS,
			'@services': paths.SRC_SERVICES,
			'@models': paths.SRC_MODELS,
			'@pages': paths.SRC_PAGES,
		},
	},
	target: 'web',
	performance: options.performance || {},
	plugins: [
		...options.plugins,
	],
	optimization: options.optimization,
	devServer: options.devServer || {},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty',
	}
});
