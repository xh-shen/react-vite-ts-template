/*
 * @Author: shen
 * @Date: 2022-05-15 22:51:42
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 10:25:41
 * @Description:
 */
import { local } from '../storage'
import { SIZE_KEY } from '../constant'

export const getSize = () => {
	return local.get<SizeType>(SIZE_KEY)
}

export const setSize = (val: SizeType) => {
	return local.set(SIZE_KEY, val)
}

export const removeSize = () => {
	return local.remove(SIZE_KEY)
}
