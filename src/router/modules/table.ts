/*
 * @Author: shen
 * @Date: 2022-09-29 14:39:35
 * @LastEditors: shen
 * @LastEditTime: 2022-10-01 08:37:49
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
	}
] as RouteObject[]
