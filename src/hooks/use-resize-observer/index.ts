/*
 * @Author: shen
 * @Date: 2022-10-20 14:22:48
 * @LastEditors: shen
 * @LastEditTime: 2022-10-20 15:00:43
 * @Description:
 */

import { useEffect } from 'react'
import { useLatest } from 'ahooks'
import { getTargetElement } from '@/utils'

import ResizeObserver from 'resize-observer-polyfill'

import type { BasicTarget } from '@/utils'

type Target = BasicTarget<HTMLElement>
type SizeInfo = {
	width: number
	height: number
}

export interface UseResizeObserverCallback {
	(SizeInfo: SizeInfo, entries: ResizeObserverEntry): void
}

export const useResizeObserver = (callback: UseResizeObserverCallback, target: Target) => {
	const callbackRef = useLatest(callback)

	useEffect(() => {
		const element = getTargetElement(target)
		if (!element) {
			return
		}
		const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const { width, height } = entries[0].contentRect
			callbackRef.current({ width, height }, entries[0])
		})
		observer.observe(element)
		return () => {
			if (observer) {
				observer.disconnect()
			}
		}
	}, [])
}
