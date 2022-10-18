/*
 * @Author: shen
 * @Date: 2022-10-18 16:37:19
 * @LastEditors: shen
 * @LastEditTime: 2022-10-18 16:46:09
 * @Description:
 */
import { useMemo } from 'react'
import type { TabOffsetMap } from './useOffsets'

const DEFAULT_SIZE = { width: 0, left: 0 }

export default function useVisibleRange(
	tabOffsets: TabOffsetMap,
	visibleTabContentValue: number,
	transform: number,
	tabContentSizeValue: number,
	operationNodeSizeValue: number,
	tabs: any[]
): [visibleStart: number, visibleEnd: number] {
	let transformSize: number = -transform

	return useMemo(() => {
		if (!tabs.length) {
			return [0, 0]
		}

		const len = tabs.length
		let endIndex = len
		for (let i = 0; i < len; i += 1) {
			const offset = tabOffsets.get(tabs[i].key) || DEFAULT_SIZE
			if (offset.left + offset.width > transformSize + visibleTabContentValue) {
				endIndex = i - 1
				break
			}
		}

		let startIndex = 0
		for (let i = len - 1; i >= 0; i -= 1) {
			const offset = tabOffsets.get(tabs[i].key) || DEFAULT_SIZE
			if (offset.left < transformSize) {
				startIndex = i + 1
				break
			}
		}
		return [startIndex, endIndex]
	}, [
		tabOffsets,
		visibleTabContentValue,
		tabContentSizeValue,
		operationNodeSizeValue,
		transformSize,
		tabs.map(tab => tab.key).join('_')
	])
}
