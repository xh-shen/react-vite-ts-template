/*
 * @Author: shen
 * @Date: 2022-09-26 10:50:37
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 15:44:40
 * @Description:
 */
import config from '@/config'
import { getLang, getToken, setLang, setToken } from '@/utils'
import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
	lang: string
	token: string
}

const initialState: AppState = {
	lang: getLang() ?? config.lang,
	token: getToken() ?? ''
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppToken(state, { payload }: PayloadAction<string>) {
			state.token = payload
			setToken(payload)
		},
		setAppLang(state, { payload }: PayloadAction<string>) {
			state.lang = payload
			setLang(payload)
		}
	}
})

export const { setAppToken, setAppLang } = appSlice.actions

export default appSlice.reducer
