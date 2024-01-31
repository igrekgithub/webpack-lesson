import { Configuration, DefinePlugin } from "webpack"
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from "webpack"
import path from 'path'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BuildOptions } from "./types/types"
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyWebpackPlagin from 'copy-webpack-plugin'

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
	const { mode, paths, analyzer, platform } = options
	const isDev = mode === 'development'
	const isProd = mode === 'production'

	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, "favicon.ico") }),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(platform),
		}),
	]

	if (isDev) {
		plugins.push(new webpack.ProgressPlugin())
		plugins.push(new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:5].css',
			chunkFilename: 'css/[name].[contenthash:5].css',
		}))
		// Выносит проверку типов в отдельный процесс
		// Не нагружает сборку, и ускоряет
		plugins.push(new ForkTsCheckerWebpackPlugin())
		plugins.push(new ReactRefreshWebpackPlugin())
	}

	if (isProd) {
		plugins.push(new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:5].css',
			chunkFilename: 'css/[name].[contenthash:5].css',
		}))
		plugins.push(new CopyWebpackPlagin({
			patterns: [
				{ from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
			],
		}))
	}

	if (analyzer) { plugins.push(new BundleAnalyzerPlugin()) }

	return plugins
}