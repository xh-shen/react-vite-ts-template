/*
 * @Author: shen
 * @Date: 2022-10-15 19:20:51
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 12:01:56
 * @Description:
 */
import config from './config'

export type PageStyleType = 'light' | 'dark' | 'layoutDark' | 'realDark'
export type LayoutType = 'side' | 'top' | 'mix'
export type CollapsePositionType = 'top' | 'bottom'

export interface AppSetting {
	themeColor: string
	pageStyle: PageStyleType
	layout: LayoutType
	siderCollapsed: boolean
	fixedHeader: boolean
	fixSiderbar: boolean
	siderWidth: number
	headerHeight: number
	colorWeak: boolean
	grayMode: boolean
	dragSidebar: boolean
	collapsePosition: CollapsePositionType
	showHeader: boolean
	showSiderbar: boolean
	showBreadcrumbs: boolean
	showLogo: boolean
	showFooter: boolean
	showCollapseButton: boolean
	fullContent: boolean
	accordionMenu: boolean
}
const defaultSetting: AppSetting = {
	themeColor: config.themeColor, // 获取于环境变量，如需修改请修改.env文件中 VITE_APP_THEME_COLOR
	colorWeak: config.colorWeak, // 获取于环境变量，如需修改请修改.env文件中 VITE_APP_COLOR_WEAK
	grayMode: config.grayMode, // 获取于环境变量，如需修改请修改.env文件中 VITE_APP_GRAY_MODE
	pageStyle: config.darkMode ? 'realDark' : 'light',
	layout: 'side',
	siderCollapsed: false,
	fixedHeader: true,
	fixSiderbar: true,
	siderWidth: 208,
	headerHeight: 48,
	dragSidebar: false,
	collapsePosition: 'top',
	showHeader: true,
	showSiderbar: true,
	showBreadcrumbs: true,
	showLogo: true,
	showFooter: true,
	showCollapseButton: true,
	fullContent: false,
	accordionMenu: true
}

export default Object.assign(defaultSetting, window.APP_DEFAULT_SETTING || {}) as AppSetting
