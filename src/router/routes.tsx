/*
 * @Author: shen
 * @Date: 2022-10-12 08:04:52
 * @LastEditors: shen
 * @LastEditTime: 2022-10-12 09:34:17
 * @Description:
 */
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import lazyLoad from './lazyLoad'
import { genModuleRoutes, findPathnames } from './util'
import { LOGIN_PATH, DASHBOARD_PATH, ROOT_PATH, NOT_FOUND_PATH, FORBIDDEN_PATH } from './constant'
import type { RouteObject } from 'react-router-dom'

const modules = import.meta.glob('./modules/*.ts', { eager: true })

export const moduleRoutes = genModuleRoutes(modules)

export const pathnames = findPathnames(moduleRoutes, [DASHBOARD_PATH, LOGIN_PATH, FORBIDDEN_PATH])

export const routes: RouteObject[] = [
	{
		path: ROOT_PATH,
		element: <Navigate to={DASHBOARD_PATH} />
	},
	{
		path: ROOT_PATH,
		element: lazyLoad(lazy(() => import(/* webpackChunkName: "layout'"*/ '@/layout/index'))),
		children: [
			{
				path: DASHBOARD_PATH,
				element: lazyLoad(lazy(() => import(/* webpackChunkName: "dashboard'"*/ '@/pages/dashboard/index')))
			},
			{
				path: FORBIDDEN_PATH,
				element: lazyLoad(lazy(() => import(/* webpackChunkName: "forbidden'"*/ '@/pages/error/Forbidden')))
			},
			...moduleRoutes
		]
	},
	{
		path: LOGIN_PATH,
		element: lazyLoad(lazy(() => import(/* webpackChunkName: "login'"*/ '@/pages/login/index')))
	},
	{
		path: NOT_FOUND_PATH,
		element: lazyLoad(lazy(() => import(/* webpackChunkName: "not-found'"*/ '@/pages/error/NotFound')))
	}
]
