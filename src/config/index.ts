/*
 * @Author: shen
 * @Date: 2022-09-26 09:18:17
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 21:28:55
 * @Description:
 */
import { parseEnv } from '@/utils'

interface Config {
	title: string
	lang: string
	baseApi: string
	timeout: number
	themeColor: string
	namespace: string
	colorWeak: boolean
	grayMode: boolean
}

const {
	VITE_APP_TITLE,
	VITE_APP_LANGUAGE,
	VITE_APP_THEME_COLOR,
	VITE_API_URL_PREFIX,
	VITE_APP_NAMESPACE,
	VITE_APP_COLOR_WEAK,
	VITE_APP_GRAY_MODE
} = parseEnv(import.meta.env)

const config: Config = {
	title: VITE_APP_TITLE || 'Shene Admin',
	lang: VITE_APP_LANGUAGE || 'en',
	baseApi: VITE_API_URL_PREFIX || '/api',
	themeColor: VITE_APP_THEME_COLOR || '#409eff',
	namespace: VITE_APP_NAMESPACE || 'shene',
	colorWeak: VITE_APP_COLOR_WEAK || false,
	grayMode: VITE_APP_GRAY_MODE || false,
	timeout: 5000
}

export default config
