/*
 * @Author: shen
 * @Date: 2022-10-01 08:39:30
 * @LastEditors: shen
 * @LastEditTime: 2022-10-01 08:48:17
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sleep } from '@/utils'
import { getAuthorizedMenu } from '@/api/menu'
import { Menu } from '@/interfaces'

export interface PermissionState {
	menu: Menu[]
}

const initialState: PermissionState = {
	menu: []
}

export const permissionSlice = createSlice({
	name: 'permission',
	initialState,
	reducers: {
		resetPermission(state) {
			state.menu = []
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchAuthorizedMenu.fulfilled, (state, { payload }) => {
			state.menu = payload
		})
	}
})

export const fetchAuthorizedMenu = createAsyncThunk('permission/fetchAuthorizedMenu', async () => {
	const { code, data } = await getAuthorizedMenu()
	await sleep(300)
	if (code === 200) {
		return data
	}
	return []
})

export const { resetPermission } = permissionSlice.actions

export default permissionSlice.reducer
