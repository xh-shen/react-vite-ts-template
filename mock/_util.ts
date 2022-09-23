/*
 * @Author: shen
 * @Date: 2022-09-23 08:42:59
 * @LastEditors: shen
 * @LastEditTime: 2022-09-23 08:43:27
 * @Description:
 */
export interface Response<T = any> {
	code: number
	data: T
	msg: string
	[key: string]: any
}

export function resultSuccess<T>(data: T, msg: string = 'ok'): Response<T> {
	return {
		code: 200,
		data,
		msg
	}
}

export function resultError(msg = 'Request failed', code = 500): Response {
	return {
		code,
		data: null,
		msg
	}
}
