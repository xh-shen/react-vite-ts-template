/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-09-23 08:41:26
 * @Description:
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

import type { ConfigEnv, UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
	console.log(mode)
	return {
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			},
			extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
		},
		server: {
			host: '0.0.0.0',
			port: 8086,
			open: true,
			cors: true
		},
		plugins: [
			react(),
			eslint(),
			viteMockServe({
				mockPath: 'mock',
				localEnabled: mode.command === 'serve'
			})
		]
	}
})
