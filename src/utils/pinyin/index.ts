/*
 * @Author: shen
 * @Date: 2022-10-27 20:06:49
 * @LastEditors: shen
 * @LastEditTime: 2022-10-28 16:24:00
 * @Description:
 */

import { isString } from '../validate'
import { fullDict } from './dict'

const getFullChar = (ch: string) => {
	for (let key in fullDict) {
		if (fullDict[key].indexOf(ch) !== -1) {
			return key
		}
	}
	return ''
}

export const getFullChars = (str: string) => {
	if (!isString(str)) {
		return ''
	}
	let len = str.length
	let result = ''
	for (let i = 0; i < len; i++) {
		let ch = str.substr(i, 1)
		let unicode = ch.charCodeAt(0)
		if (unicode > 40869 || unicode < 19968) {
			result += ch
		} else {
			let name = getFullChar(ch)
			if (name) {
				result += name
			}
		}
	}
	return result.toLowerCase()
}
