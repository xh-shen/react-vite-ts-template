import { useDispatchDarkModeContext } from './../../context/DarkModeContext'
/*
 * @Author: shen
 * @Date: 2022-10-13 14:05:42
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 14:42:48
 * @Description:
 */
import { addClass, hasClass, removeClass } from '@/utils'
import { useAppSelector, useAppDispatch, setAppSettingValues, resetAppSetting } from '@/store'
import { useDispatchThemeColorContext } from '@/context/ThemeColorContext'
import defaultSetting from '@/defaultSetting'
const setColorWeak = isColorWeak => {
	const has = hasClass(document.body, 'color-weak')
	if (isColorWeak) {
		!has && addClass(document.body, 'color-weak')
	} else {
		has && removeClass(document.body, 'color-weak')
	}
}

const setGrayMode = isGrapMode => {
	const has = hasClass(document.body, 'gray-mode')
	if (isGrapMode) {
		!has && addClass(document.body, 'gray-mode')
	} else {
		has && removeClass(document.body, 'gray-mode')
	}
}

export const useAppSetting = () => {
	const layout = useAppSelector(state => state.app.layout)
	const contentWidth = useAppSelector(state => state.app.contentWidth)
	const splitMenus = useAppSelector(state => state.app.splitMenus)
	const pageStyle = useAppSelector(state => state.app.pageStyle)
	const siderWidth = useAppSelector(state => state.app.siderWidth)
	const fixedHeader = useAppSelector(state => state.app.fixedHeader)
	const fixSiderbar = useAppSelector(state => state.app.fixSiderbar)
	const headerHeight = useAppSelector(state => state.app.headerHeight)
	const footerHeight = useAppSelector(state => state.app.footerHeight)
	const tabsHeight = useAppSelector(state => state.app.tabsHeight)
	const siderCollapsed = useAppSelector(state => state.app.siderCollapsed)
	const grayMode = useAppSelector(state => state.app.grayMode)
	const darkMode = useAppSelector(state => state.app.darkMode)
	const colorWeak = useAppSelector(state => state.app.colorWeak)
	const collapsePosition = useAppSelector(state => state.app.collapsePosition)
	const dragSidebar = useAppSelector(state => state.app.dragSidebar)
	const showHeader = useAppSelector(state => state.app.showHeader)
	const showSiderbar = useAppSelector(state => state.app.showSiderbar)
	const showBreadcrumbs = useAppSelector(state => state.app.showBreadcrumbs)
	const showBreadcrumbIcon = useAppSelector(state => state.app.showBreadcrumbIcon)
	const showLogo = useAppSelector(state => state.app.showLogo)
	const showFooter = useAppSelector(state => state.app.showFooter)
	const showTabs = useAppSelector(state => state.app.showTabs)
	const showCollapseButton = useAppSelector(state => state.app.showCollapseButton)
	const fullContent = useAppSelector(state => state.app.fullContent)
	const accordionMenu = useAppSelector(state => state.app.accordionMenu)

	const { resetThemeColor } = useDispatchThemeColorContext()
	const { resetDarkMode } = useDispatchDarkModeContext()

	const dispatch = useAppDispatch()
	const setSettingValue = <T = any>(key: keyof AppSetting, value: T, cache: boolean = true) => {
		if (key === 'colorWeak') {
			setColorWeak(value)
		}

		if (key === 'grayMode') {
			setGrayMode(value)
		}
		if (key === 'layout') {
			if (value !== 'mix' && splitMenus) {
				dispatch(setAppSettingValues({ key: 'splitMenus', value: false, cache }))
			}
			if (value !== 'top' && contentWidth === 'Fixed') {
				dispatch(setAppSettingValues({ key: 'contentWidth', value: 'Fluid', cache }))
			}
		}

		if (key === 'splitMenus' && value && collapsePosition === 'top') {
			dispatch(setAppSettingValues({ key: 'collapsePosition', value: 'bottom', cache }))
		}

		dispatch(setAppSettingValues({ key, value, cache }))
	}

	const resetSettingValues = () => {
		dispatch(resetAppSetting())
		if (defaultSetting.colorWeak !== colorWeak) {
			setColorWeak(defaultSetting.colorWeak)
		}
		if (defaultSetting.grayMode !== grayMode) {
			setGrayMode(defaultSetting.grayMode)
		}

		resetThemeColor()
		resetDarkMode()
	}

	return {
		siderWidth,
		pageStyle,
		layout,
		contentWidth,
		splitMenus,
		fixedHeader,
		fixSiderbar,
		siderCollapsed,
		headerHeight,
		footerHeight,
		tabsHeight,
		colorWeak,
		grayMode,
		darkMode,
		collapsePosition,
		dragSidebar,
		showHeader,
		showSiderbar,
		showBreadcrumbs,
		showBreadcrumbIcon,
		showLogo,
		showFooter,
		showCollapseButton,
		fullContent,
		accordionMenu,
		showTabs,
		setSettingValue,
		resetSettingValues
	}
}
