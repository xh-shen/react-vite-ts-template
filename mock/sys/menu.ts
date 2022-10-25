/*
 * @Author: shen
 * @Date: 2022-10-01 08:06:55
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 21:19:03
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
		title: lang === 'zh-CN' ? '表格页' : 'Table'
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
		icon: 'edit-line',
		title: lang === 'zh-CN' ? '表单页' : 'Form'
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
	},
	{
		id: '30',
		pid: '0',
		path: '/menu',
		icon: 'menu-line',
		title: lang === 'zh-CN' ? '多级菜单' : 'MultiMenu'
	},
	{
		id: '31',
		pid: '30',
		path: '/menu/menu1',
		title: lang === 'zh-CN' ? '菜单1' : 'Menu1'
	},
	{
		id: '32',
		pid: '31',
		path: '/menu/menu1/menu1-1',
		title: lang === 'zh-CN' ? '菜单1-1' : 'Menu1-1'
	},
	{
		id: '33',
		pid: '32',
		path: '/menu/menu1/menu1-1/menu1-1-1',
		title: lang === 'zh-CN' ? '菜单1-1-1' : 'Menu1-1-1'
	},
	{
		id: '34',
		pid: '32',
		path: '/menu/menu1/menu1-1/menu1-1-2',
		title: lang === 'zh-CN' ? '菜单1-1-2' : 'Menu1-1-2'
	},
	{
		id: '35',
		pid: '31',
		path: '/menu/menu1/menu1-2',
		title: lang === 'zh-CN' ? '菜单1-2' : 'Menu1-2'
	},
	{
		id: '36',
		pid: '30',
		path: '/menu/menu2',
		title: lang === 'zh-CN' ? '菜单2' : 'Menu2'
	},
	{
		id: '37',
		pid: '0',
		path: '/root',
		title: lang === 'zh-CN' ? '根菜单' : 'Root'
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
