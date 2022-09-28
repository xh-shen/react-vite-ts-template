/*
 * @Author: shen
 * @Date: 2022-09-23 08:43:11
 * @LastEditors: shen
 * @LastEditTime: 2022-09-28 14:32:42
 * @Description:
 */
import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

import messages from '../_messages'
import { resultSuccess, resultError } from '../_util'

export default [
	{
		url: '/api/login',
		method: 'post',
		response: ({ body, headers }) => {
			if (body.username === 'admin' || body.phone === '13000000000') {
				if (body.username) {
					if (body.password === '123456') {
						return resultSuccess<any>(
							Mock.mock({
								'token|1-5': /([a-z][A-Z][0-9]){5,10}-/
							}),
							messages[headers.lang].loginSuccess
						)
					} else {
						return resultError(messages[headers.lang].accoutError, 400)
					}
				} else {
					if (body.code === '0000') {
						return resultSuccess<any>(
							Mock.mock({
								'token|1-5': /([a-z][A-Z][0-9]){5,10}-/
							}),
							messages[headers.lang].loginSuccess
						)
					} else {
						return resultError(messages[headers.lang].codeError, 400)
					}
				}
			} else {
				return resultError(messages[headers.lang].accountNotFount)
			}
		}
	}
] as MockMethod[]
