/*
 * @Author: shen
 * @Date: 2022-09-30 08:17:25
 * @LastEditors: shen
 * @LastEditTime: 2022-10-19 14:32:32
 * @Description:
 */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	useAppSelector,
	useAppDispatch,
	resetUser,
	setAppAuthorized,
	fetchUserInfo,
	fetchAuthorizedMenu,
	resetPermission,
	setAppInvalid
} from '@/store'
import { Spin } from 'antd'
import { LOGIN_PATH, ANALYSIS_PATH, WHITE_PATHS, NOT_FOUND_PATH, ROOT_PATH, FORBIDDEN_PATH } from './constant'
import config from '@/config'

import type { RouteObject, NavigateFunction } from 'react-router-dom'

const checkRouterAuth = (pathname: string, flatMenuKeys: string[], navigate: NavigateFunction) => {
	if (!flatMenuKeys.includes(pathname)) {
		navigate({ pathname: FORBIDDEN_PATH }, { replace: true })
	}
}

export default (metaRoutes: RouteObject[], pathnames: string[]): RouteObject[] => {
	const { pathname } = useLocation()
	const [routes, setRoutes] = useState<RouteObject[]>(metaRoutes)
	const token = useAppSelector(state => state.user.token)
	const authorized = useAppSelector(state => state.app.authorized)
	const invalid = useAppSelector(state => state.app.invalid)
	const menuTitles = useAppSelector(state => state.permission.menuTitles)
	const flatMenuKeys = useAppSelector(state => state.permission.flatMenuKeys)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const getAuthorizeData = async () => {
		const userInfo = await dispatch(fetchUserInfo()).unwrap()
		const menuList = await dispatch(fetchAuthorizedMenu()).unwrap()
		if (userInfo && menuList.length > 0) {
			setRoutes(metaRoutes)
			dispatch(setAppAuthorized(true))
		} else {
			dispatch(setAppInvalid(true))
		}
	}

	useEffect(() => {
		if (pathname === ROOT_PATH || WHITE_PATHS.includes(pathname)) {
			return
		}

		if (!pathnames.includes(pathname)) {
			navigate({ pathname: NOT_FOUND_PATH }, { replace: true })
			return
		}

		if (!token && pathname !== LOGIN_PATH) {
			navigate({ pathname: LOGIN_PATH }, { replace: true })
			return
		}
		if (token && pathname === LOGIN_PATH) {
			navigate({ pathname: ANALYSIS_PATH }, { replace: true })
			return
		}

		if (token && !authorized) {
			setRoutes([
				{
					path: pathname,
					element: (
						<Spin
							size="large"
							style={{
								display: 'flex',
								// alignItems: 'center',
								paddingTop: '200px',
								justifyContent: 'center',
								minHeight: '100%'
							}}
						/>
					)
				}
			])
			getAuthorizeData()
			return
		}

		if (token && authorized) {
			checkRouterAuth(pathname, flatMenuKeys, navigate)
			return
		}
	}, [pathname])

	useEffect(() => {
		if (menuTitles[pathname]) {
			document.title = menuTitles[pathname] + ' - ' + config.title
		}
	}, [pathname, menuTitles])

	useEffect(() => {
		if (authorized) {
			checkRouterAuth(pathname, flatMenuKeys, navigate)
		}
	}, [authorized])

	useEffect(() => {
		if (invalid) {
			setRoutes(metaRoutes)
			dispatch(setAppAuthorized(false))
			dispatch(setAppInvalid(false))
			navigate({ pathname: LOGIN_PATH }, { replace: true })
			dispatch(resetUser())
			dispatch(resetPermission())
		}
	}, [invalid])

	return routes
}
