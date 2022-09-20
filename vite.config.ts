/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-09-20 10:13:15
 * @Description:
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'
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
			}
		},
		server: {
			host: '0.0.0.0',
			port: 8086,
			open: true,
			cors: true
		},
		plugins: [react(), eslint()]
	}
})
