/*
 * @Author: shen
 * @Date: 2022-10-03 13:52:43
 * @LastEditors: shen
 * @LastEditTime: 2022-10-03 14:41:30
 * @Description:
 */
import { PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import legacy from '@vitejs/plugin-legacy'
import { configHtmlPlugin } from './html'
import { configSvgIconsPlugin } from './svgIcon'
import { configMockPlugin } from './mock'
import { configVisualizerConfig } from './visualizer'
import { configCompressPlugin } from './compress'
import { configImageminPlugin } from './imagemin'

export function createPlugins(viteEnv: ViteEnv, isBuild: boolean) {
	console.log(viteEnv)
	const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

	const vitePlugins: (PluginOption | PluginOption[])[] = [react(), eslint()]

	VITE_LEGACY && isBuild && vitePlugins.push(legacy())

	vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

	vitePlugins.push(configSvgIconsPlugin(isBuild))

	VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

	vitePlugins.push(configVisualizerConfig())

	if (isBuild) {
		VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())

		vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
	}

	return vitePlugins
}
