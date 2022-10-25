/*
 * @Author: shen
 * @Date: 2022-10-15 19:20:51
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 18:02:56
 * @Description:
 */
import config from './config'

export type PageStyleType = 'light' | 'dark' | 'layoutDark'
export type LayoutType = 'side' | 'top' | 'mix'
export type CollapsePositionType = 'top' | 'bottom'
export type ContentWidth = 'Fluid' | 'Fixed'

export interface AppSetting {
	themeColor: string
	pageStyle: PageStyleType
	layout: LayoutType
	contentWidth: ContentWidth
	splitMenus: boolean
	siderCollapsed: boolean
	fixedHeader: boolean
	fixSiderbar: boolean
	siderWidth: number
	headerHeight: number
	footerHeight: number
	tabsHeight: number
	colorWeak: boolean
	grayMode: boolean
	darkMode: boolean
	dragSidebar: boolean
	collapsePosition: CollapsePositionType
	showHeader: boolean
	showSiderbar: boolean
	showBreadcrumbs: boolean
	showBreadcrumbIcon: boolean
	showLogo: boolean
	showFooter: boolean
	showTabs: boolean
	showCollapseButton: boolean
	fullContent: boolean
	accordionMenu: boolean
}

const defaultSetting: AppSetting = {
	themeColor: config.themeColor, // 获取于环境变量，如需修改请修改.env文件中 VITE_APP_THEME_COLOR
	colorWeak: config.colorWeak, // 获取于环境变量，如需修改请修改.env文件中 VITE_APP_COLOR_WEAK
	grayMode: config.grayMode, // 获取于环境变量，如需修改请修改.env文件中 VITE_APP_GRAY_MODE
	darkMode: config.darkMode, // 获取于环境变量，如需修改请修改.env文件中 VITE_APP_DARK_MODE
	pageStyle: 'dark',
	layout: 'side',
	contentWidth: 'Fluid',
	splitMenus: false,
	siderCollapsed: false,
	fixedHeader: true,
	fixSiderbar: true,
	siderWidth: 208,
	headerHeight: 48,
	footerHeight: 48,
	tabsHeight: 32,
	dragSidebar: false,
	collapsePosition: 'top',
	showHeader: true,
	showSiderbar: true,
	showBreadcrumbs: true,
	showLogo: true,
	showFooter: true,
	showTabs: true,
	showCollapseButton: true,
	showBreadcrumbIcon: true,
	fullContent: false,
	accordionMenu: true
}

export default Object.assign(defaultSetting, window.APP_DEFAULT_SETTING || {}) as AppSetting
