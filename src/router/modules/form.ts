/*
 * @Author: shen
 * @Date: 2022-09-30 08:53:13
 * @LastEditors: shen
 * @LastEditTime: 2022-10-29 11:52:17
 * @Description:
 */
import { lazy } from 'react'
import lazyLoad from '../lazyLoad'
import { RouteObject } from 'react-router-dom'

export default [
	{
		path: '/form/basic',
		element: lazyLoad(lazy(() => import('@/pages/form/basic')))
	},
	{
		path: '/form/step',
		element: lazyLoad(lazy(() => import('@/pages/form/step')))
	},
	{
		path: '/form/hight',
		element: lazyLoad(lazy(() => import('@/pages/form/hight')))
	}
] as RouteObject[]
