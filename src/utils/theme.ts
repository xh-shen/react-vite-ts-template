/*
 * @Author: shen
 * @Date: 2022-10-01 10:32:28
 * @LastEditors: shen
 * @LastEditTime: 2022-10-01 10:32:36
 * @Description:
 */
import { local } from './storage'
import { THEME_COLOR_KEY } from './constant'

export const getThemeColor = () => {
	return local.get<string>(THEME_COLOR_KEY)
}

export const setThemeColor = (val: string) => {
	return local.set(THEME_COLOR_KEY, val)
}

export const removeThemeColor = () => {
	return local.remove(THEME_COLOR_KEY)
}
