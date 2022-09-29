/*
 * @Author: shen
 * @Date: 2022-09-26 10:50:37
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 16:45:29
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfo as getUserInfoApi } from '@/api/user'
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
		setUserInfo: (state, { payload }: PayloadAction<UserInfo>) => {
			state.info = payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getUserInfo.pending, state => {
				console.log('🚀 ~ 进行中！', state)
			})
			.addCase(getUserInfo.fulfilled, (state, { payload }) => {
				console.log('🚀 ~ fulfilled', payload)
				state.info = payload
			})
			.addCase(getUserInfo.rejected, (state, err) => {
				console.log('🚀 ~ rejected', err)
			})
	}
})

export const getUserInfo = createAsyncThunk('user/getInfo', async () => {
	const { code, data } = await getUserInfoApi()
	if (code === 200) {
		return data
	}
	return {} as UserInfo
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
