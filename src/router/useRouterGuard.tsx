/*
 * @Author: shen
 * @Date: 2022-09-30 08:17:25
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 11:47:06
 * @Description:
 */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, RouteObject } from 'react-router-dom'
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

const LOGIN_PATH = '/login'
const DASHBOARD_PATH = '/dashboard'
const WHITE_PATHS = ['/404']

export default (metaRoutes: RouteObject[], pathnames: string[]): RouteObject[] => {
	const { pathname } = useLocation()
	const [routes, setRoutes] = useState<RouteObject[]>(metaRoutes)
	const token = useAppSelector(state => state.user.token)
	const authorized = useAppSelector(state => state.app.authorized)
	const invalid = useAppSelector(state => state.app.invalid)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const getAuthorizeData = async () => {
		const userInfo = await dispatch(fetchUserInfo()).unwrap()
		const menuList = await dispatch(fetchAuthorizedMenu()).unwrap()
		if (userInfo && menuList.length > 0) {
			dispatch(setAppAuthorized(true))
		} else {
			dispatch(setAppInvalid(true))
		}
	}

	useEffect(() => {
		if (pathname === '/' || WHITE_PATHS.includes(pathname)) {
			return
		}

		if (!pathnames.includes(pathname)) {
			navigate({ pathname: '/404' }, { replace: true })
			return
		}

		if (!token && pathname !== LOGIN_PATH) {
			navigate({ pathname: LOGIN_PATH }, { replace: true })
			return
		}
		if (token && pathname === LOGIN_PATH) {
			navigate({ pathname: DASHBOARD_PATH }, { replace: true })
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
								paddingTop: '100px',
								justifyContent: 'center',
								height: '100%'
							}}
						/>
					)
				}
			])
			getAuthorizeData()
		}
	}, [pathname])

	useEffect(() => {
		if (authorized) {
			setRoutes(metaRoutes)
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
