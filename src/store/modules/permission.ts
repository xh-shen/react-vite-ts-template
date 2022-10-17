/*
 * @Author: shen
 * @Date: 2022-10-01 08:39:30
 * @LastEditors: shen
 * @LastEditTime: 2022-10-17 08:23:00
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { genDashboardMenu, sleep } from '@/utils'
import { getAuthorizedMenu } from '@/api/menu'
import { MenuData } from '@/interfaces'
import { genLocalRouterTitles } from '@/router'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PermissionState {
	flatMenus: MenuData[]
	matchMenus: MenuData[]
	flatMenuKeys: string[]
	menuTitles: Record<string, string>
}

const initialState: PermissionState = {
	flatMenus: [],
	flatMenuKeys: [],
	matchMenus: [],
	menuTitles: genLocalRouterTitles()
}

export const permissionSlice = createSlice({
	name: 'permission',
	initialState,
	reducers: {
		setMatchMenus(state, { payload }: PayloadAction<MenuData[]>) {
			state.matchMenus = payload
		},
		resetPermission(state) {
			state.flatMenus = []
			state.flatMenuKeys = []
			state.menuTitles = genLocalRouterTitles()
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchAuthorizedMenu.fulfilled, (state, { payload }) => {
			state.flatMenus = [genDashboardMenu(), ...payload]
			state.flatMenuKeys = state.flatMenus.map(menu => menu.path)
			let tempMenuTitles: any = {}
			state.flatMenus.forEach(item => {
				tempMenuTitles[item.path] = item.title
			})
			state.menuTitles = { ...tempMenuTitles, ...genLocalRouterTitles() }
			tempMenuTitles = null
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

export const { resetPermission, setMatchMenus } = permissionSlice.actions

export default permissionSlice.reducer
