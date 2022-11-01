/*
 * @Author: shen
 * @Date: 2022-10-17 08:44:04
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 12:20:38
 * @Description:
 */
import { local } from '../storage'
import { TABS_KEY } from '../constant'

import type { VisitedItem } from '@/store'

export interface LocalTabs {
	lang: LocaleType
	list: VisitedItem[]
}

export const getTabList = () => {
	return local.get<LocalTabs>(TABS_KEY)
}

export const setTabList = (val: LocalTabs) => {
	local.set(TABS_KEY, val)
}

export const removeTabList = () => {
	local.remove(TABS_KEY)
}
