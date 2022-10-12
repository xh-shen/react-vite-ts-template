/*
 * @Author: shen
 * @Date: 2022-10-01 08:39:30
 * @LastEditors: shen
 * @LastEditTime: 2022-10-12 13:36:39
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sleep } from '@/utils'
import { getAuthorizedMenu } from '@/api/menu'
import { MenuData } from '@/interfaces'
import { genLocalRouterTitles } from '@/router'
import i18n from '@/locale'

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
			state.flatMenus = [
				{ title: i18n.t('app.dashboard'), path: '/dashboard', icon: 'dashboard-line', pid: '0', id: 'dashboard' },
				...payload
			]
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
