/*
 * @Author: shen
 * @Date: 2022-10-16 18:28:21
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 12:20:45
 * @Description:
 */
import { getTabList, setTabList } from '@/utils'
import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { LocalTabs } from '@/utils'
export interface VisitedItem {
	path: string
	title: string
}

export interface TabsState {
	visitedList: VisitedItem[]
	tabsLang: LocaleType
}

const initialState: TabsState = {
	visitedList: getTabList()?.list || [],
	tabsLang: getTabList()?.lang || ''
}

export const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		addTabsItem(state, { payload }: PayloadAction<VisitedItem>) {
			state.visitedList.push(payload)
			setTabList({ list: state.visitedList, lang: state.tabsLang })
		},
		delTabsItem(state, { payload }: PayloadAction<string>) {
			const index = state.visitedList.findIndex(item => item.path === payload)
			if (index > -1) {
				state.visitedList.splice(index, 1)
				setTabList({ list: state.visitedList, lang: state.tabsLang })
			}
		},
		delTabsLeftItems(state, { payload }: PayloadAction<string>) {
			const index = state.visitedList.findIndex(item => item.path === payload)
			if (index > -1) {
				const visitedList = state.visitedList.filter((item, idx) => idx >= index)
				state.visitedList = [...visitedList]
				setTabList({ list: state.visitedList, lang: state.tabsLang })
			}
		},
		delTabsRightItems(state, { payload }: PayloadAction<string>) {
			const index = state.visitedList.findIndex(item => item.path === payload)
			if (index > -1) {
				const visitedList = state.visitedList.filter((item, idx) => idx <= index)
				state.visitedList = [...visitedList]
				setTabList({ list: state.visitedList, lang: state.tabsLang })
			}
		},
		delTabsOtherItems(state, { payload }: PayloadAction<string>) {
			const visitedList = state.visitedList.filter(item => item.path === payload)
			state.visitedList = [...visitedList]
			setTabList({ list: state.visitedList, lang: state.tabsLang })
		},
		delTabsAllItems(state) {
			state.visitedList = []
			setTabList({ list: [], lang: state.tabsLang })
		},
		setTabsLang(state, { payload }: PayloadAction<LocaleType>) {
			state.tabsLang = payload
		},
		setVisitedList(state, { payload }: PayloadAction<LocalTabs>) {
			state.visitedList = [...payload.list]
			setTabList(payload)
		}
	}
})
export const {
	addTabsItem,
	delTabsItem,
	delTabsLeftItems,
	delTabsRightItems,
	delTabsOtherItems,
	delTabsAllItems,
	setTabsLang,
	setVisitedList
} = tabsSlice.actions

export default tabsSlice.reducer
