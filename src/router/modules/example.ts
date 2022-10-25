/*
 * @Author: shen
 * @Date: 2022-10-25 21:14:46
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 21:19:34
 * @Description:
 */
import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from 'react-router-dom'

export default [
	{
		path: '/menu/menu2',
		element: lazyLoad(lazy(() => import('@/pages/example/index')))
	},
	{
		path: '/menu/menu1/menu1-2',
		element: lazyLoad(lazy(() => import('@/pages/example/index')))
	},
	{
		path: '/menu/menu1/menu1-1/menu1-1-1',
		element: lazyLoad(lazy(() => import('@/pages/example/index')))
	},
	{
		path: '/menu/menu1/menu1-1/menu1-1-2',
		element: lazyLoad(lazy(() => import('@/pages/example/index')))
	},
	{
		path: '/root',
		element: lazyLoad(lazy(() => import('@/pages/example/index')))
	}
] as RouteObject[]
