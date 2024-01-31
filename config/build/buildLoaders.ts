import { ModuleOptions } from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BuildOptions } from "./types/types"
import svgLoader from "@svgr/webpack"
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { buildBabelLoader } from "./babel/buildBabelLoader"

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
	const isDev = options.mode === 'development'
	const isprod = options.mode === 'production'

	const cssLoaderWithModules = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
			},
		},
	}


	const scssLoader = {
		// 1- вариант css -> js
		// 	test:  /\.s[ac]ss$/i,
		// 	use: [
		// "style-loader",
		// "css-loader",
		// "sass-loader"
		//  ],
		// 2- вариант css отдельно, а лучше - isDev ?
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? MiniCssExtractPlugin.loader : "style-loader",
			cssLoaderWithModules,
			"sass-loader",
		],
	}

	const imagesLoader = {
		test: /\.(png|jpg|jpeg|gif|ico|webp)$/i,
		type: 'asset/resource',
	}

	// тут проблемы с css color
	const svgLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [{ loader: '@svgr/webpack', options: { icon: true } }],
	}

	// другой вариант 
	// const svgLoader = {
	// 	test: /\.svg$/i,
	// 	issuer: /\.[jt]sx?$/,
	// 	use: [{
	// 		loader: '@svgr/webpack',
	// 		options: {
	// 			icon: true,
	// 			svgoConfig: {
	// 				plugins: [
	// 					{
	// 						name: 'convertColors',
	// 						params: {
	// 							currentColor: true,
	// 						}
	// 					}
	// 				]
	// 			}
	// 		}
	// 	}],
	// }

  // обычный tsLoader без transpileOnly
	// ts-loader умеет работать с JSX
	// если без ts-loader, то нужен babel-loader + его настройка

	// const tsLoader = {
	// 	test: /\.tsx?$/,
	// 	use: 'ts-loader',
	// 	exclude: /node_modules/,
	// }

	// transpileOnly: true ускоряет проверку типов
	const tsLoader = {
		test: /\.tsx?$/,
		use:
		{
			loader: 'ts-loader',
			options: {
				getCustomTransformers: () => ({
					before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
				}),
				transpileOnly: true
			}
		},
		exclude: /node_modules/,
	}


      // перенос всего babelLoader в отдельный файл для иллюстрации кастомного плагина
	    // вариант с babel-loader
	// const babelLoader = {
	    //test: /\.m?js$/, // - из доки не подойдёт
	// 	test: /\.tsx?$/,
	// 	exclude: /node_modules/,
	// 	use: {
	// 		loader: "babel-loader",

			// options сделали отдельно в babel.config.json, это оправдано,
			// если babel.config.json будет нести ещё какую-то нагрузку, напр. jest

			// options: {
			// 	presets: [
			// 		'@babel/preset-env',
			// 		"@babel/preset-typescript",
			// 		["@babel/preset-react", {
			// 			runtime: isDev ? 'automatic' : 'classic',
			// 		}]
			// 	]
			// }
	// 	}
	// }

	const babelLoader = buildBabelLoader(isDev)

	return [
		scssLoader,
		babelLoader,
		//tsLoader,
		imagesLoader,
		svgLoader
	]



}


// {
// 	test: /\.tsx?$/,
// 	use: [
// 		{
// 			loader: 'ts-loader',
// 			options: {
// 				transpileOnly: true
// 			}
// 		}
// 	]
// }