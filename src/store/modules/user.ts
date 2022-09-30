/*
 * @Author: shen
 * @Date: 2022-09-26 10:50:37
 * @LastEditors: shen
 * @LastEditTime: 2022-09-30 16:02:48
 * @Description:
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getToken, setToken, removeToken, sleep } from '@/utils'
import { login, getUserInfo } from '@/api/user'
import { UserInfo, LoginParams } from '@/interfaces'
import { Notification } from '@/utils'

export interface UserState {
	info: UserInfo
	token: string
	isInvalidToken: boolean
}

const initialState: UserState = {
	info: {} as UserInfo,
	token: getToken() ?? '',
	isInvalidToken: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUser(state) {
			state.info = {} as UserInfo
			state.token = ''
			removeToken()
		},
		setIsInvalidToken(state, { payload }: PayloadAction<boolean>) {
			state.isInvalidToken = payload
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
			state.token = payload
			setToken(payload)
		})
		builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
			if (payload) {
				state.info = payload
			}
		})
	}
})

export const fetchLogin = createAsyncThunk('user/fetchLogin', async (params: LoginParams) => {
	const { code, data, msg } = await login(params)
	await sleep(500) //添加请求延迟效果，真实情景需去掉
	if (code === 200) {
		Notification(msg)
		return data.token
	}
	return Promise.reject(msg)
})

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
	const { code, data } = await getUserInfo()
	await sleep(300)
	if (code === 200) {
		return data
	}
	return null
})

export const { resetUser, setIsInvalidToken } = userSlice.actions

export default userSlice.reducer
