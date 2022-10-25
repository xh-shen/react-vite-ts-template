/*
 * @Author: shen
 * @Date: 2022-09-26 10:50:37
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 17:58:28
 * @Description:
 */
import { getLang, setLang, getSettingValues, setSettingValues, getSettingValue, removeSettingValues } from '@/utils'
import { createSlice } from '@reduxjs/toolkit'
import defaultSetting from '@/defaultSetting'
import config from '@/config'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppSetting, PageStyleType, LayoutType, ContentWidth, CollapsePositionType } from '@/defaultSetting'

export interface AppState extends AppSetting {
	lang: string
	authorized: boolean // 是否获取到授权信息
	invalid: boolean // 是否登录失效
	primaryMenuKey: string
}

type SettingValuePayload = {
	key: keyof AppSetting
	value: any
	cache: boolean
}

const initialState: AppState = {
	authorized: false,
	invalid: false,
	primaryMenuKey: '',
	lang: getLang() ?? config.lang,
	themeColor: getSettingValue<PageStyleType>('themeColor') ?? defaultSetting.themeColor,
	pageStyle: getSettingValue<PageStyleType>('pageStyle') ?? defaultSetting.pageStyle,
	layout: getSettingValue<LayoutType>('layout') ?? defaultSetting.layout,
	contentWidth: getSettingValue<ContentWidth>('contentWidth') ?? defaultSetting.contentWidth,
	splitMenus: getSettingValue<boolean>('splitMenus') ?? defaultSetting.splitMenus,
	siderCollapsed: getSettingValue<boolean>('siderCollapsed') ?? defaultSetting.siderCollapsed,
	fixedHeader: getSettingValue<boolean>('fixedHeader') ?? defaultSetting.fixedHeader,
	fixSiderbar: getSettingValue<boolean>('fixSiderbar') ?? defaultSetting.fixSiderbar,
	siderWidth: getSettingValue<number>('siderWidth') ?? defaultSetting.siderWidth,
	headerHeight: getSettingValue<number>('headerHeight') ?? defaultSetting.headerHeight,
	footerHeight: getSettingValue<number>('footerHeight') ?? defaultSetting.footerHeight,
	tabsHeight: getSettingValue<number>('tabsHeight') ?? defaultSetting.tabsHeight,
	colorWeak: getSettingValue<boolean>('colorWeak') ?? defaultSetting.colorWeak,
	grayMode: getSettingValue<boolean>('grayMode') ?? defaultSetting.grayMode,
	darkMode: getSettingValue<boolean>('darkMode') ?? defaultSetting.darkMode,
	dragSidebar: getSettingValue<boolean>('dragSidebar') ?? defaultSetting.dragSidebar,
	collapsePosition: getSettingValue<CollapsePositionType>('collapsePosition') ?? defaultSetting.collapsePosition,
	showHeader: getSettingValue<boolean>('showHeader') ?? defaultSetting.showHeader,
	showSiderbar: getSettingValue<boolean>('showSiderbar') ?? defaultSetting.showSiderbar,
	showBreadcrumbs: getSettingValue<boolean>('showBreadcrumbs') ?? defaultSetting.showBreadcrumbs,
	showBreadcrumbIcon: getSettingValue<boolean>('showBreadcrumbIcon') ?? defaultSetting.showBreadcrumbIcon,
	showLogo: getSettingValue<boolean>('showLogo') ?? defaultSetting.showLogo,
	showFooter: getSettingValue<boolean>('showFooter') ?? defaultSetting.showFooter,
	showTabs: getSettingValue<boolean>('showTabs') ?? defaultSetting.showTabs,
	showCollapseButton: getSettingValue<boolean>('showCollapseButton') ?? defaultSetting.showCollapseButton,
	fullContent: getSettingValue<boolean>('fullContent') ?? defaultSetting.fullContent,
	accordionMenu: getSettingValue<boolean>('accordionMenu') ?? defaultSetting.accordionMenu
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppLang(state, { payload }: PayloadAction<string>) {
			state.lang = payload
			setLang(payload)
		},
		setAppAuthorized(state, { payload }: PayloadAction<boolean>) {
			state.authorized = payload
		},
		setAppInvalid(state, { payload }: PayloadAction<boolean>) {
			state.invalid = payload
		},
		setPrimaryMenuKey(state, { payload }: PayloadAction<string>) {
			state.primaryMenuKey = payload
		},
		setAppSettingValues(state, { payload }: PayloadAction<SettingValuePayload>) {
			state[payload.key as string] = payload.value
			if (payload.cache) {
				const setting = getSettingValues() || {}
				setSettingValues({ ...setting, [payload.key]: payload.value })
			}
		},
		resetAppSetting(state) {
			for (const key in defaultSetting) {
				state[key] = defaultSetting[key]
			}
			removeSettingValues()
		}
	}
})

export const { setAppLang, setAppAuthorized, setAppInvalid, setAppSettingValues, resetAppSetting, setPrimaryMenuKey } =
	appSlice.actions

export default appSlice.reducer
