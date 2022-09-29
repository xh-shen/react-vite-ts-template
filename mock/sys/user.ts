/*
 * @Author: shen
 * @Date: 2022-09-23 08:43:11
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 13:37:49
 * @Description:
 */
import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

import messages from '../_messages'
import { resultSuccess, resultError, getRequestToken } from '../_util'

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
	},
	{
		url: '/api/getUserInfo',
		method: 'get',
		response: request => {
			const token = getRequestToken(request)
			if (!token) return resultError('Invalid token')
			return resultSuccess<any>({
				id: '1',
				username: 'admin',
				realName: request.headers.lang === 'zh-CN' ? '管理员' : 'Admin',
				phone: '13000000000',
				avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
				roleName: request.headers.lang === 'zh-CN' ? '超级管理员' : 'Super Admin',
				role: 'super',
				sex: request.headers.lang === 'zh-CN' ? '男' : 'man'
			})
		}
	}
] as MockMethod[]
