/*
 * @Author: shen
 * @Date: 2022-09-23 09:10:20
 * @LastEditors: shen
 * @LastEditTime: 2022-10-12 08:11:45
 * @Description:
 */
import { useRoutes } from 'react-router-dom'
import { routes as metaRoutes, pathnames } from './routes'
import useRouterGuard from './useRouterGuard'
import i18n from '@/locale'

import type { FC } from 'react'

export const genLocalRouterTitles = () => ({
	'/login': i18n.t('app.login'),
	'/dashboard': i18n.t('app.dashboard'),
	'/404': '404'
})

const Router: FC = () => {
	const routes = useRouterGuard(metaRoutes, pathnames)

	const element = useRoutes(routes)
	return element
}

export default Router
