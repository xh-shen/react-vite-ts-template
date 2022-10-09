/*
 * @Author: shen
 * @Date: 2022-10-09 15:47:20
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 15:54:11
 * @Description:
 */
import { SETTING_KEY } from './constant'
import { local } from './storage'

export const getSettingValue = (key: string) => {
	const setting = local.get<Record<string, any>>(SETTING_KEY) || {}
	return setting[key] || ''
}

export const getSettingValues = () => {
	return local.get(SETTING_KEY)
}

export const setSettingValues = (values: Record<string, any>) => {
	local.set(SETTING_KEY, values)
}

export const removeSettingValues = () => {
	return local.remove(SETTING_KEY)
}
