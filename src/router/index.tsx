/*
 * @Author: shen
 * @Date: 2022-09-23 09:10:20
 * @LastEditors: shen
 * @LastEditTime: 2022-09-23 09:16:34
 * @Description:
 */
import { useRoutes } from 'react-router-dom'

import type { RouteObject } from 'react-router-dom'

export const rootRouter: RouteObject[] = []

const Router = () => {
	const routes = useRoutes(rootRouter)
	return routes
}

export default Router
