/*
 * @Author: shen
 * @Date: 2022-09-22 14:25:04
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 14:36:24
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

// export function resultPageSuccess<T = any>(page: number, pageSize: number, list: T[], { message = 'ok' } = {}) {
// 	const pageData = pagination(page, pageSize, list)

// 	return {
// 		...resultSuccess({
// 			items: pageData,
// 			total: list.length
// 		}),
// 		message
// 	}
// }

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
	const offset = (pageNo - 1) * Number(pageSize)
	return offset + Number(pageSize) >= array.length
		? array.slice(offset, array.length)
		: array.slice(offset, offset + Number(pageSize))
}

export interface requestParams {
	method: string
	body: any
	headers?: { authorization?: string }
	query: any
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
	return headers?.authorization
}
