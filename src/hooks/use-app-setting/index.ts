/*
 * @Author: shen
 * @Date: 2022-10-13 14:05:42
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 14:18:57
 * @Description:
 */

import { useAppSelector, useAppDispatch, setAppSettingValues } from '@/store'

export const useAppSetting = () => {
	const layout = useAppSelector(state => state.app.layout)
	const pageStyle = useAppSelector(state => state.app.pageStyle)
	const siderWidth = useAppSelector(state => state.app.siderWidth)
	const fixedHeader = useAppSelector(state => state.app.fixedHeader)
	const fixSiderbar = useAppSelector(state => state.app.fixSiderbar)
	const headerHeight = useAppSelector(state => state.app.headerHeight)
	const siderCollapsed = useAppSelector(state => state.app.siderCollapsed)
	const dispatch = useAppDispatch()

	const setSettingValue = <T = any>(key: string, value: T) => {
		dispatch(setAppSettingValues({ key, value }))
	}

	return { siderWidth, pageStyle, layout, fixedHeader, fixSiderbar, siderCollapsed, headerHeight, setSettingValue }
}
