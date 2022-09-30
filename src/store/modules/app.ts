/*
 * @Author: shen
 * @Date: 2022-09-26 10:50:37
 * @LastEditors: shen
 * @LastEditTime: 2022-09-30 13:40:18
 * @Description:
 */
import config from '@/config'
import { getLang, setLang } from '@/utils'
import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
	lang: string
	authorized: boolean
}

const initialState: AppState = {
	lang: getLang() ?? config.lang,
	authorized: false
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
		}
	}
})

export const { setAppLang, setAppAuthorized } = appSlice.actions

export default appSlice.reducer
