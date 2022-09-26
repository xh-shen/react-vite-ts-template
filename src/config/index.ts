/*
 * @Author: shen
 * @Date: 2022-09-26 09:18:17
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 09:21:13
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
	title: title || 'shene react admin',
	lang: lang || 'zh-cn',
	baseApi: baseApi || '/api',
	themeColor: themeColor || '#409eff',
	timeout: 5000
}

export default config
