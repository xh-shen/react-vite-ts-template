/*
 * @Author: shen
 * @Date: 2022-10-03 12:50:06
 * @LastEditors: shen
 * @LastEditTime: 2022-10-03 14:32:32
 * @Description:
 */
export function parseEnv(envConf: Recordable): ViteEnv {
	const ret: any = {}

	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName].replace(/\\n/g, '\n')
		realName = realName === 'true' ? true : realName === 'false' ? false : realName

		if (envName === 'VITE_PORT') {
			realName = Number(realName)
		}
		if (envName === 'VITE_PROXY' && realName) {
			try {
				realName = JSON.parse(realName.replace(/'/g, '"'))
			} catch (error) {
				realName = ''
			}
		}
		ret[envName] = realName
		if (typeof realName === 'string') {
			process.env[envName] = realName
		} else if (typeof realName === 'object') {
			process.env[envName] = JSON.stringify(realName)
		}
	}
	return ret
}

export function isReportMode(): boolean {
	return process.env.REPORT === 'true'
}
