/*
 * @Author: shen
 * @Date: 2022-10-09 15:47:20
 * @LastEditors: shen
 * @LastEditTime: 2022-10-14 10:52:34
 * @Description:
 */
import { SETTING_KEY } from '../constant'
import { local } from '../storage'

export const getSettingValue = <T>(key: string): T | null => {
	const setting = local.get<Record<string, any>>(SETTING_KEY) || {}
	return (setting[key] as T) ?? null
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
