/*
 * @Author: shen
 * @Date: 2022-09-30 08:53:13
 * @LastEditors: shen
 * @LastEditTime: 2022-10-01 08:37:43
 * @Description:
 */
import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from 'react-router-dom'

export default [
	{
		path: '/form/basic',
		element: lazyLoad(lazy(() => import('@/pages/dashboard/index')))
	},
	{
		path: '/form/step',
		element: lazyLoad(lazy(() => import('@/pages/dashboard/index')))
	},
	{
		path: '/form/hight',
		element: lazyLoad(lazy(() => import('@/pages/dashboard/index')))
	}
] as RouteObject[]
