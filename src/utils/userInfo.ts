/*
 * @Author: shen
 * @Date: 2022-05-15 22:51:42
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 10:23:28
 * @Description:
 */
import { local } from './storage'
import { USER_INFO_KEY } from './constant'

export const getUserInfo = () => {
	return local.get<Record<string, unknown>>(USER_INFO_KEY)
}

export const setUserInfo = (data: Record<string, unknown>) => {
	return local.set(USER_INFO_KEY, data)
}

export const removeUserInfo = () => {
	return local.remove(USER_INFO_KEY)
}
