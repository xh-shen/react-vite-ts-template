/*
 * @Author: shen
 * @Date: 2022-09-26 10:50:37
 * @LastEditors: shen
 * @LastEditTime: 2022-09-30 16:15:56
 * @Description:
 */
import config from '@/config'
import { getLang, setLang } from '@/utils'
import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
	lang: string
	authorized: boolean // 是否获取到授权信息
	invalid: boolean // 是否登录失效
}

const initialState: AppState = {
	lang: getLang() ?? config.lang,
	authorized: false,
	invalid: false
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
		}
	}
})

export const { setAppLang, setAppAuthorized, setAppInvalid } = appSlice.actions

export default appSlice.reducer
