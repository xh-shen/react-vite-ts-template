/*
 * @Author: shen
 * @Date: 2022-09-22 13:48:48
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 14:43:40
 * @Description:
 */
import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

import { resultSuccess, resultError } from './_util'

type LoginSuccessResult = {
	token: string
}

export default [
	{
		url: '/api/login',
		method: 'post',
		response: ({ body }) => {
			if (body.username === 'admin' && body.password === '123456') {
				return resultSuccess<LoginSuccessResult>(
					Mock.mock({
						'token|1-5': /([a-z][A-Z][0-9]){5,10}-/
					})
				)
			} else if (body.username === 'admin' || body.password != '123456') {
				return resultError('账号或密码错误', 400)
			} else {
				return resultError('账号不存在')
			}
		}
	}
] as MockMethod[]
