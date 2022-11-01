/*
 * @Author: shen
 * @Date: 2022-11-01 08:21:44
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 13:42:08
 * @Description:
 */
declare type LocaleType = 'zh-cn' | 'en'
declare type SizeType = 'small' | 'middle' | 'large'
declare type PageStyleType = 'light' | 'dark' | 'layoutDark'
declare type LayoutType = 'side' | 'top' | 'mix'
declare type CollapsePositionType = 'top' | 'bottom'
declare type ContentWidthType = 'Fluid' | 'Fixed'
declare interface AppSetting {
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
