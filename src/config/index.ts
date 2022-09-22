/*
 * @Author: shen
 * @Date: 2022-09-22 13:38:45
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 13:43:38
 * @Description:
 */
interface Config {
	title: string
	lang: string
	baseApi: string
	timeout: number
	themeColor: string
}

const { themeColor, title, lang, baseApi } = JSON.parse('{}')
const config: Config = {
	title: title || 'shene micro',
	lang: lang || 'zh-cn',
	baseApi: baseApi || '/api',
	themeColor: themeColor || '#409eff',
	timeout: 5000
}

export default config
