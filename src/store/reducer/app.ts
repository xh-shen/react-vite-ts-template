/*
 * @Author: shen
 * @Date: 2022-09-22 15:50:59
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 16:37:24
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
	userInfo: {
		username: string
		sex: string
		name: string
	}
}

const initialState: AppState = {
	userInfo: {
		username: 'admin',
		sex: '男',
		name: '超级管理员'
	}
}

export const counterSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setUserInfo: (state, action: PayloadAction<AppState['userInfo']>) => {
			state.userInfo = action.payload
		}
	}
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = counterSlice.actions

export default counterSlice.reducer
