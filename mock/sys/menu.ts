/*
 * @Author: shen
 * @Date: 2022-10-01 08:06:55
 * @LastEditors: shen
 * @LastEditTime: 2022-10-11 09:21:14
 * @Description:
 */
import { MockMethod } from 'vite-plugin-mock'

import { resultSuccess, resultError, getRequestToken } from '../_util'

const genMenList = lang => [
	{
		id: '2',
		pid: '0',
		path: '/table',
		icon: 'table-line',
		title: lang === 'zh-CN' ? '表格' : 'Table'
	},
	{
		id: '2-1',
		pid: '2',
		path: '/table/basic',
		icon: '',
		title: lang === 'zh-CN' ? '基础表格' : 'Basic Table'
	},
	{
		id: '2-2',
		pid: '2',
		path: '/table/query',
		icon: '',
		title: lang === 'zh-CN' ? '查询表格' : 'Query Table'
	},
	{
		id: '3',
		pid: '0',
		path: '/form',
		icon: 'write-line',
		title: lang === 'zh-CN' ? '表单' : 'Form'
	},
	{
		id: '3-1',
		pid: '3',
		path: '/form/basic',
		icon: '',
		title: lang === 'zh-CN' ? '基础表单' : 'Basic Form'
	},
	{
		id: '3-2',
		pid: '3',
		path: '/form/step',
		icon: '',
		title: lang === 'zh-CN' ? '分步表单' : 'Step Form'
	},
	{
		id: '3-3',
		pid: '3',
		path: '/form/hight',
		icon: '',
		title: lang === 'zh-CN' ? '高级表单' : 'Hight Form'
	}
]

export default [
	{
		url: '/api/getAuthorizedMenu',
		method: 'get',
		response: request => {
			const token = getRequestToken(request)
			if (!token) return resultError('Invalid token', 401)
			return resultSuccess<any>(genMenList(request.headers.lang))
		}
	}
] as MockMethod[]
