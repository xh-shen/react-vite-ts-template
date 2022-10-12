/*
 * @Author: shen
 * @Date: 2022-09-29 14:39:35
 * @LastEditors: shen
 * @LastEditTime: 2022-10-12 08:28:33
 * @Description:
 */
import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from 'react-router-dom'

export default [
	{
		path: '/table/basic',
		element: lazyLoad(lazy(() => import('@/pages/dashboard/index')))
	},
	{
		path: '/table/query',
		element: lazyLoad(lazy(() => import('@/pages/dashboard/index')))
	},
	{
		path: '/table/test',
		element: lazyLoad(lazy(() => import('@/pages/example/index')))
	}
] as RouteObject[]
