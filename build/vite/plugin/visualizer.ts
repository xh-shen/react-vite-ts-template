import { PluginOption } from 'vite'
/*
 * @Author: shen
 * @Date: 2022-10-03 14:30:12
 * @LastEditors: shen
 * @LastEditTime: 2022-10-03 14:33:37
 * @Description:
 */
import visualizer from 'rollup-plugin-visualizer'
import { isReportMode } from '../../util'

export function configVisualizerConfig() {
	if (isReportMode()) {
		return visualizer({
			filename: './node_modules/.cache/visualizer/stats.html',
			open: true,
			gzipSize: true,
			brotliSize: true
		}) as PluginOption
	}
	return []
}
