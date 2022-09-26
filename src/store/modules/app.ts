/*
 * @Author: shen
 * @Date: 2022-09-26 10:50:37
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 12:58:03
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
		setAppToken(state, action: PayloadAction<string>) {
			state.token = action.payload
			setToken(action.payload)
		},
		setAppLang(state, action: PayloadAction<string>) {
			state.token = action.payload
			setLang(action.payload)
		}
	}
})

export const { setAppToken, setAppLang } = appSlice.actions

export default appSlice.reducer
