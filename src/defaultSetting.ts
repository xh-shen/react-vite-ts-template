/*
 * @Author: shen
 * @Date: 2022-10-15 19:20:51
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 08:36:49
 * @Description:
 */
import config from './config'

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
