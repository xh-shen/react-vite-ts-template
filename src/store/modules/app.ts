/*
 * @Author: shen
 * @Date: 2022-09-26 10:50:37
 * @LastEditors: shen
 * @LastEditTime: 2022-10-12 15:42:14
 * @Description:
 */
import config from '@/config'
import { getLang, setLang, getThemeColor, setThemeColor, getSettingValues, setSettingValues, getSettingValue } from '@/utils'
import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
	lang: string
	themeColor: string
	authorized: boolean // 是否获取到授权信息
	invalid: boolean // 是否登录失效
	pageStyle: 'light' | 'dark' | 'realDark'
	layout: 'side' | 'top' | 'mix'
	siderCollapsed: boolean
	fixedHeader: boolean
	fixSiderbar: boolean
	siderWidth: number
	headerHeight: number
}

const initialState: AppState = {
	lang: getLang() ?? config.lang,
	themeColor: getThemeColor() ?? config.themeColor,
	authorized: false,
	invalid: false,
	pageStyle: getSettingValue('pageStyle') || 'light',
	layout: getSettingValue('layout') || 'side',
	siderCollapsed: false,
	fixedHeader: true,
	fixSiderbar: true,
	siderWidth: 208,
	headerHeight: 48
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppLang(state, { payload }: PayloadAction<string>) {
			state.lang = payload
			setLang(payload)
		},
		setAppThemeColor(state, { payload }: PayloadAction<string>) {
			state.themeColor = payload
			setThemeColor(payload)
		},
		setAppAuthorized(state, { payload }: PayloadAction<boolean>) {
			state.authorized = payload
		},
		setAppInvalid(state, { payload }: PayloadAction<boolean>) {
			state.invalid = payload
		},
		setSiderCollapsed(state, { payload }: PayloadAction<boolean>) {
			state.siderCollapsed = payload
		},
		setAppSettingValues(state, { payload }: PayloadAction<Record<string, any>>) {
			state[payload.key] = payload.value
			const setting = getSettingValues() || {}
			setSettingValues({ ...setting, [payload.key]: payload.value })
		}
	}
})

export const { setAppLang, setAppAuthorized, setAppInvalid, setAppThemeColor, setAppSettingValues, setSiderCollapsed } =
	appSlice.actions

export default appSlice.reducer
