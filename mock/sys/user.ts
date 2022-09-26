/*
 * @Author: shen
 * @Date: 2022-09-23 08:43:11
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 13:57:40
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
			if (body.username === 'admin' && body.password === '123456') {
				return resultSuccess<any>(
					Mock.mock({
						'token|1-5': /([a-z][A-Z][0-9]){5,10}-/
					}),
					messages[headers.lang].loginSuccess
				)
			} else if (body.username === 'admin' || body.password != '123456') {
				return resultError(messages[headers.lang].accoutError, 400)
			} else {
				return resultError(messages[headers.lang].accountNotFount)
			}
		}
	}
] as MockMethod[]
