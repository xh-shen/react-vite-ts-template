/*
 * @Author: shen
 * @Date: 2022-09-23 09:10:20
 * @LastEditors: shen
 * @LastEditTime: 2022-09-30 14:50:49
 * @Description:
 */
import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { genModuleRoutes, findPathnames } from './util'
import useRouterGuard from './useRouterGuard'
import lazyLoad from './lazyLoad'

import type { FC } from 'react'
import type { RouteObject } from 'react-router-dom'

const modules = import.meta.glob('./modules/*.ts', { eager: true })

const moduleRoutes = genModuleRoutes(modules)

const pathnames = findPathnames(moduleRoutes, ['/dashboard', '/login'])

export const metaRoutes: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to="/dashboard" />
	},
	{
		path: '/',
		element: lazyLoad(lazy(() => import(/* webpackChunkName: "layout'"*/ '@/layout/index'))),
		children: [
			{
				path: '/dashboard',
				element: lazyLoad(lazy(() => import(/* webpackChunkName: "dashboard'"*/ '@/pages/dashboard/index')))
			},
			...moduleRoutes
		]
	},
	{
		path: '/login',
		element: lazyLoad(lazy(() => import(/* webpackChunkName: "login'"*/ '@/pages/login/index')))
	},
	{
		path: '/404',
		element: lazyLoad(lazy(() => import(/* webpackChunkName: "not-found'"*/ '@/pages/error/NotFound')))
	}
]

const Router: FC = () => {
	const routes = useRouterGuard(metaRoutes, pathnames)

	const element = useRoutes(routes)
	return element
}

export default Router
