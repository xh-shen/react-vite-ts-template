/*
 * @Author: shen
 * @Date: 2022-09-26 09:18:17
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 08:19:35
 * @Description:
 */
import { parseEnv } from '@/utils'

interface Config {
	title: string
	lang: 'en' | 'zh-cn'
	baseApi: string
	timeout: number
	themeColor: string
	namespace: string
	colorWeak: boolean
	grayMode: boolean
	darkMode: boolean
	enableSetting: boolean
	size: 'small' | 'middle' | 'large'
}

const {
	VITE_APP_TITLE,
	VITE_APP_LANGUAGE,
	VITE_APP_THEME_COLOR,
	VITE_API_URL_PREFIX,
	VITE_APP_NAMESPACE,
	VITE_APP_COLOR_WEAK,
	VITE_APP_GRAY_MODE,
	VITE_APP_DARK_MODE,
	VITE_ENABLE_SETTING
} = parseEnv(import.meta.env)

const config: Config = {
	title: VITE_APP_TITLE ?? 'Shene Admin',
	lang: VITE_APP_LANGUAGE ?? 'zh-cn',
	baseApi: VITE_API_URL_PREFIX ?? '/api',
	themeColor: VITE_APP_THEME_COLOR ?? '#409eff',
	namespace: VITE_APP_NAMESPACE ?? 'shene',
	colorWeak: VITE_APP_COLOR_WEAK ?? false,
	grayMode: VITE_APP_GRAY_MODE ?? false,
	darkMode: VITE_APP_DARK_MODE ?? false,
	enableSetting: VITE_ENABLE_SETTING ?? true,
	timeout: 5000,
	size: 'middle'
}

export default config
