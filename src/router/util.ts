/*
 * @Author: shen
 * @Date: 2022-09-30 08:48:15
 * @LastEditors: shen
 * @LastEditTime: 2022-09-30 09:30:09
 * @Description:
 */
import { RouteObject } from 'react-router-dom'

export const findPathnames = (moduleRoutes: RouteObject[], localPathnames: string[]): string[] => {
	return [...moduleRoutes.map(item => item.path!), ...localPathnames]
}
export const genModuleRoutes = (modules: Record<string, unknown>): RouteObject[] => {
	const routes: RouteObject[] = []
	Object.keys(modules).forEach(key => {
		routes.push(...(modules[key] as any).default)
	})
	return routes
}
