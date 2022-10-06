/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-10-06 14:32:00
 * @Description:
 */
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { parseEnv } from './build/util'
import { createProxy } from './build/vite/proxy'
import { VITE_OUTPUT_DIR } from './build/constant'
import { createPlugins } from './build/vite/plugin'

import dayjs from 'dayjs'
import pkg from './package.json'

import type { ConfigEnv, UserConfig } from 'vite'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd()
	const env = loadEnv(mode, root)
	const viteEnv = parseEnv(env)
	const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_APP_NAMESPACE, VITE_APP_THEME_COLOR } = viteEnv
	const isBuild = command === 'build'

	return {
		base: VITE_PUBLIC_PATH,
		root,
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		server: {
			host: true,
			open: true,
			port: VITE_PORT,
			proxy: createProxy(VITE_PROXY)
		},
		esbuild: {
			pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
		},
		build: {
			target: 'es2015',
			cssTarget: 'chrome80',
			outDir: VITE_OUTPUT_DIR,
			chunkSizeWarningLimit: 2000
		},
		define: {
			__INTLIFY_PROD_DEVTOOLS__: false,
			__APP_INFO__: JSON.stringify(__APP_INFO__)
		},
		css: {
			preprocessorOptions: {
				less: {
					modifyVars: {
						'primary-color': VITE_APP_THEME_COLOR,
						namespace: VITE_APP_NAMESPACE
					},
					javascriptEnabled: true,
					additionalData: `@import "@/styles/common/var.less";
													 @import "@/styles/common/mixins.less";
													`
				}
			}
		},
		plugins: createPlugins(viteEnv, isBuild)
	}
})
