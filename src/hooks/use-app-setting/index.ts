/*
 * @Author: shen
 * @Date: 2022-10-13 14:05:42
 * @LastEditors: shen
 * @LastEditTime: 2022-10-17 09:34:51
 * @Description:
 */
import { addClass, removeClass } from '@/utils'
import { useAppSelector, useAppDispatch, setAppSettingValues, resetAppSetting } from '@/store'
import { disable as darkreaderDisable, enable as darkreaderEnable, setFetchMethod as setFetch } from 'darkreader'

import type { AppSetting } from '@/defaultSetting'

export const useAppSetting = () => {
	const themeColor = useAppSelector(state => state.app.themeColor)
	const layout = useAppSelector(state => state.app.layout)
	const pageStyle = useAppSelector(state => state.app.pageStyle)
	const siderWidth = useAppSelector(state => state.app.siderWidth)
	const fixedHeader = useAppSelector(state => state.app.fixedHeader)
	const fixSiderbar = useAppSelector(state => state.app.fixSiderbar)
	const headerHeight = useAppSelector(state => state.app.headerHeight)
	const footerHeight = useAppSelector(state => state.app.footerHeight)
	const tabsHeight = useAppSelector(state => state.app.tabsHeight)
	const siderCollapsed = useAppSelector(state => state.app.siderCollapsed)
	const grayMode = useAppSelector(state => state.app.grayMode)
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

	const dispatch = useAppDispatch()

	const setSettingValue = <T = any>(key: keyof AppSetting, value: T, cache: boolean = true) => {
		if (key === 'colorWeak') {
			value ? addClass(document.body, 'color-weak') : removeClass(document.body, 'color-weak')
		}

		if (key === 'grayMode') {
			value ? addClass(document.body, 'gray-mode') : removeClass(document.body, 'gray-mode')
		}

		if (key === 'pageStyle') {
			if (value === 'realDark') {
				const defaultTheme = {
					brightness: 100,
					contrast: 90,
					sepia: 10
				}

				const defaultFixes = {
					invert: [],
					css: '',
					ignoreInlineStyle: ['.react-switch-handle'],
					ignoreImageAnalysis: [],
					disableStyleSheetsProxy: true
				}
				if (window.MutationObserver && window.fetch) {
					setFetch(window.fetch)
					darkreaderEnable(defaultTheme, defaultFixes)
				}
			} else {
				if (window.MutationObserver) darkreaderDisable()
			}
		}

		dispatch(setAppSettingValues({ key, value, cache }))
	}

	const resetSettingValues = () => {
		dispatch(resetAppSetting())
	}

	return {
		themeColor,
		siderWidth,
		pageStyle,
		layout,
		fixedHeader,
		fixSiderbar,
		siderCollapsed,
		headerHeight,
		footerHeight,
		tabsHeight,
		colorWeak,
		grayMode,
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
