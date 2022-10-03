/*
 * @Author: shen
 * @Date: 2022-10-03 14:23:37
 * @LastEditors: shen
 * @LastEditTime: 2022-10-03 14:23:42
 * @Description:
 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgIconsPlugin(isBuild: boolean) {
	const svgIconsPlugin = createSvgIconsPlugin({
		iconDirs: [path.resolve(process.cwd(), 'src/icons')],
		svgoOptions: isBuild,
		symbolId: 'icon-[dir]-[name]'
	})
	return svgIconsPlugin
}
