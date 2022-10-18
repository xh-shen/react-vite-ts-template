/*
 * @Author: shen
 * @Date: 2022-10-18 16:04:41
 * @LastEditors: shen
 * @LastEditTime: 2022-10-18 16:16:21
 * @Description:
 */
import { useMemo } from 'react'

export type TabSizeMap = Map<React.Key, { width: number; left: number }>

export interface TabOffset {
	width: number
	left: number
	right: number
}
export type TabOffsetMap = Map<React.Key, TabOffset>

const DEFAULT_SIZE = { width: 0, left: 0 }
export default function useOffsets(tabs: any[], tabSizes: TabSizeMap, holderScrollWidth: number) {
	return useMemo(() => {
		const map: TabOffsetMap = new Map()

		const lastOffset = tabSizes.get(tabs[0]?.key) || DEFAULT_SIZE
		const rightOffset = lastOffset.left + lastOffset.width

		for (let i = 0; i < tabs.length; i += 1) {
			const { key } = tabs[i]
			let data = tabSizes.get(key)
			if (!data) {
				data = tabSizes.get(tabs[i - 1]?.key) || DEFAULT_SIZE
			}
			const entity = (map.get(key) || { ...data }) as TabOffset
			entity.right = rightOffset - entity.left - entity.width
			map.set(key, entity)
		}
		return map
	}, [tabs.map(tab => tab.key).join('_'), tabSizes, holderScrollWidth])
}
