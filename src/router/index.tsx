/*
 * @Author: shen
 * @Date: 2022-09-23 09:10:20
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 16:59:30
 * @Description:
 */
import { FC, lazy, useEffect, useState, useCallback } from 'react'
import { Navigate, useRoutes, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch, getUserInfo } from '@/store'
import lazyLoad from './lazyLoad'
import Layout from '@/layout'
import { Spin } from 'antd'

import type { RouteObject } from 'react-router-dom'

export const defaultRoutes: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to="/dashboard" />
	},
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/dashboard',
				element: lazyLoad(lazy(() => import(/* webpackChunkName: "dashboard'"*/ '@/pages/dashboard/index')))
			}
		]
	},
	{
		path: '/login',
		element: lazyLoad(lazy(() => import(/* webpackChunkName: "login'"*/ '@/pages/login/index')))
	}
]

function LoadingPage() {
	return (
		<Spin
			size="large"
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%'
			}}
		/>
	)
}

const sleep = () => {
	return new Promise((resolve: any) => {
		setTimeout(resolve, 2000)
	})
}

const Router: FC = () => {
	const { pathname } = useLocation()
	const [routes, setRoutes] = useState<RouteObject[]>(defaultRoutes)
	const [loading, setLoading] = useState(false)
	const token = useAppSelector(state => state.app.token)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const getData = useCallback(async () => {
		await sleep()
		await dispatch(getUserInfo())
		await setLoading(true)
	}, [])

	useEffect(() => {
		if (pathname === '/') {
			return
		}
		if (!token && pathname !== '/login') {
			navigate({ pathname: '/login' }, { replace: true })
		} else if (token) {
			if (pathname === '/login') {
				navigate({ pathname: '/dashboard' }, { replace: true })
			} else {
				if (!loading) {
					setRoutes([
						{
							path: pathname,
							element: <LoadingPage />
						}
					])
				}
				getData()
			}
		}
	}, [pathname])

	useEffect(() => {
		if (loading) {
			setRoutes(defaultRoutes)
		}
	}, [loading])
	const element = useRoutes(routes)
	return element
}

export default Router
