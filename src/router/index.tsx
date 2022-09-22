/*
 * @Author: shen
 * @Date: 2022-09-21 15:55:13
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 10:44:17
 * @Description:
 */
import Layout from '@/layout'
import About from '@/pages/about'
import NotFound from '@/pages/error/NotFound'
import Home from '@/pages/home'
import { useEffect, useState } from 'react'
import { RouteObject, useLocation, useRoutes } from 'react-router-dom'

const defaultRoutes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: '/about',
				element: <About />
			}
		]
	},
	{
		path: '*',
		element: <NotFound />
	}
]

const sleep = () => {
	return new Promise((resolve: any) => {
		setTimeout(resolve, 2000)
	})
}

function LoadingPage() {
	return <div>loading...</div>
}

function RenderRouter() {
	const { pathname } = useLocation()
	const [loading, setLoading] = useState(false)
	const [routes, setRoutes] = useState<RouteObject[]>([
		{
			path: pathname,
			element: <LoadingPage />
		}
	])

	const getData = async () => {
		await sleep()
		setLoading(true)
	}

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		if (loading) {
			setRoutes(defaultRoutes)
		}
	}, [loading])

	const element = useRoutes(routes)
	return element
}

export default RenderRouter
