/*
 * @Author: shen
 * @Date: 2022-05-15 22:51:42
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 08:59:22
 * @Description:
 */
import { local } from '../storage'
import { LANG_KEY } from '../constant'

export const getLang = () => {
	return local.get<LocaleType>(LANG_KEY)
}

export const setLang = (val: LocaleType) => {
	return local.set(LANG_KEY, val)
}

export const removeLang = () => {
	return local.remove(LANG_KEY)
}
