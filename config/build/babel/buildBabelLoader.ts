import { BuildOptions } from "typescript";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader(isDev: boolean) {
	const plugins = []

	if(!isDev){
		plugins.push([
			removeDataTestIdBabelPlugin,
			{
				props: ['data-testid']
			}
		])
	}

	return {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				presets: [
					'@babel/preset-env',
					"@babel/preset-typescript",
					["@babel/preset-react", {
						runtime: isDev ? 'automatic' : 'classic',
					}]
				],
				 plugins: plugins.length ? plugins : undefined
			}
		}
	}
}	 