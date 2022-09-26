/*
 * @Author: shen
 * @Date: 2022-09-26 10:50:37
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 12:58:09
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit'
import { UserInfo } from '@/interfaces'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
	info: UserInfo
}

const initialState: UserState = {
	info: {} as UserInfo
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserInfo: (state, action: PayloadAction<UserInfo>) => {
			state.info = action.payload
		}
	}
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
