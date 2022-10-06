/*
 * @Author: shen
 * @Date: 2022-09-26 09:18:17
 * @LastEditors: shen
 * @LastEditTime: 2022-10-06 14:42:41
 * @Description:
 */
interface Config {
	title: string
	lang: string
	baseApi: string
	timeout: number
	themeColor: string
	namespace: string
}

console.log(import.meta.env)
const { VITE_APP_TITLE, VITE_APP_LANGUAGE, VITE_APP_THEME_COLOR, VITE_API_URL_PREFIX, VITE_APP_NAMESPACE } = import.meta.env

const config: Config = {
	title: VITE_APP_TITLE || 'Shene Admin',
	lang: VITE_APP_LANGUAGE || 'en',
	baseApi: VITE_API_URL_PREFIX || '/api',
	themeColor: VITE_APP_THEME_COLOR || '#409eff',
	namespace: VITE_APP_NAMESPACE || 'shene',
	timeout: 5000
}

export default config
