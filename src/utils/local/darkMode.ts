/*
 * @Author: shen
 * @Date: 2022-10-01 10:32:28
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 14:22:46
 * @Description:
 */
import { local } from '../storage'
import { DARK_MODE_KEY } from '../constant'

export const getDarkMode = () => {
	return local.get<boolean>(DARK_MODE_KEY)
}

export const setDarkMode = (val: boolean) => {
	return local.set(DARK_MODE_KEY, val)
}

export const removeDarkMode = () => {
	return local.remove(DARK_MODE_KEY)
}
