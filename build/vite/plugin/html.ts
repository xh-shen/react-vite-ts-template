/*
 * @Author: shen
 * @Date: 2022-10-03 14:01:33
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 21:16:42
 * @Description:
 */
import type { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import pkg from '../../../package.json'
import { GLOB_CONFIG_FILE_NAME } from '../../constant'

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
	const { VITE_APP_TITLE, VITE_PUBLIC_PATH, VITE_APP_THEME_COLOR, VITE_APP_COLOR_WEAK, VITE_APP_GRAY_MODE } = env
	const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`

	const getAppConfigSrc = () => {
		return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`
	}

	const htmlPlugin: PluginOption[] = createHtmlPlugin({
		minify: isBuild,
		inject: {
			data: {
				title: VITE_APP_TITLE,
				themeColor: VITE_APP_THEME_COLOR,
				colorWeak: VITE_APP_COLOR_WEAK,
				grayMode: VITE_APP_GRAY_MODE
			},
			tags: isBuild
				? [
						{
							tag: 'script',
							attrs: {
								src: getAppConfigSrc()
							}
						}
				  ]
				: []
		}
	})
	return htmlPlugin
}
