/*
 * @Author: shen
 * @Date: 2022-09-29 14:39:35
 * @LastEditors: shen
 * @LastEditTime: 2022-09-30 08:55:57
 * @Description:
 */
import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from 'react-router-dom'

export default [
	{
		path: '/table/base',
		element: lazyLoad(lazy(() => import('@/pages/dashboard/index')))
	},
	{
		path: '/table/query',
		element: lazyLoad(lazy(() => import('@/pages/dashboard/index')))
	}
] as RouteObject[]
