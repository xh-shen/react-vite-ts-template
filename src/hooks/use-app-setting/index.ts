/*
 * @Author: shen
 * @Date: 2022-10-13 14:05:42
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 20:54:22
 * @Description:
 */

import { useAppSelector, useAppDispatch, setAppSettingValues } from '@/store'
import { addClass, removeClass } from '@/utils'

export const useAppSetting = () => {
	const layout = useAppSelector(state => state.app.layout)
	const pageStyle = useAppSelector(state => state.app.pageStyle)
	const siderWidth = useAppSelector(state => state.app.siderWidth)
	const fixedHeader = useAppSelector(state => state.app.fixedHeader)
	const fixSiderbar = useAppSelector(state => state.app.fixSiderbar)
	const headerHeight = useAppSelector(state => state.app.headerHeight)
	const siderCollapsed = useAppSelector(state => state.app.siderCollapsed)
	const grayMode = useAppSelector(state => state.app.grayMode)
	const colorWeak = useAppSelector(state => state.app.colorWeak)
	const dispatch = useAppDispatch()

	const setSettingValue = <T = any>(key: string, value: T) => {
		if (key === 'colorWeak') {
			value ? addClass(document.body, 'color-weak') : removeClass(document.body, 'color-weak')
		}

		if (key === 'grayMode') {
			value ? addClass(document.body, 'gray-mode') : removeClass(document.body, 'gray-mode')
		}

		dispatch(setAppSettingValues({ key, value }))
	}

	return {
		siderWidth,
		pageStyle,
		layout,
		fixedHeader,
		fixSiderbar,
		siderCollapsed,
		headerHeight,
		colorWeak,
		grayMode,
		setSettingValue
	}
}
