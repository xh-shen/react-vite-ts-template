/*
 * @Author: shen
 * @Date: 2022-10-01 08:39:30
 * @LastEditors: shen
 * @LastEditTime: 2022-10-11 18:02:02
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sleep } from '@/utils'
import { getAuthorizedMenu } from '@/api/menu'
import { MenuData } from '@/interfaces'
import { genLocalRouterTitles } from '@/router'
import i18n from '@/locale'

export interface PermissionState {
	flatmMenus: MenuData[]
	flatmMenuKeys: string[]
	menuTitles: Record<string, string>
}

const initialState: PermissionState = {
	flatmMenus: [],
	flatmMenuKeys: [],
	menuTitles: genLocalRouterTitles()
}

export const permissionSlice = createSlice({
	name: 'permission',
	initialState,
	reducers: {
		resetPermission(state) {
			state.flatmMenus = []
			state.flatmMenuKeys = []
			state.menuTitles = genLocalRouterTitles()
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchAuthorizedMenu.fulfilled, (state, { payload }) => {
			state.flatmMenus = [
				{ title: i18n.t('app.dashboard'), path: '/dashboard', icon: 'dashboard-line', pid: '0', id: 'dashboard' },
				...payload
			]
			state.flatmMenuKeys = state.flatmMenus.map(menu => menu.path)
			let tempMenuTitles: any = {}
			state.flatmMenus.forEach(item => {
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

export const { resetPermission } = permissionSlice.actions

export default permissionSlice.reducer
