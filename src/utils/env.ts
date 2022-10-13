/*
 * @Author: shen
 * @Date: 2022-10-13 21:27:26
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 21:34:34
 * @Description:
 */
export function parseEnv(envConf: Recordable): ViteEnv {
	const ret: any = {}

	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName]
		if (typeof realName === 'string') {
			realName = realName.replace(/\\n/g, '\n')
		}
		realName = realName === 'true' ? true : realName === 'false' ? false : realName
		ret[envName] = realName
		if (typeof realName === 'string') {
			ret[envName] = realName
		} else if (typeof realName === 'object') {
			ret[envName] = JSON.stringify(realName)
		}
	}
	return ret as ViteEnv
}
