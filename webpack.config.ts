import webpack from "webpack"
import path from 'path'
import { buildWebpack } from './config/build/buildWebpack'
import { BuildMode, BuildPaths, BuildPlatform } from "./config/build/types/types";


interface EnvVariables {
	mode?: BuildMode
	analyzer?: boolean
	platform?: BuildPlatform,
	port?: number,
}

export default (env: EnvVariables) => {
	const paths: BuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'build', 'index.html'),
		public: path.resolve(__dirname, 'public'),
		src: path.resolve(__dirname, 'src'),
	}

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? "development",
		paths,
		analyzer: env.analyzer,
		platform: env.platform ?? "desk",
	})
	return config
}