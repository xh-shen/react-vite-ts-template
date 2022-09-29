/*
 * @Author: shen
 * @Date: 2022-09-23 08:42:59
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 13:25:13
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

export interface RequestParams {
	method: string
	body: any
	headers?: { authorization?: string }
	query: any
}

export function getRequestToken({ headers }: RequestParams): string | undefined {
	return headers?.authorization
}
