/*
 * @Author: shen
 * @Date: 2022-10-28 21:55:26
 * @LastEditors: shen
 * @LastEditTime: 2022-10-28 22:10:23
 * @Description:
 */
import { useState, useLayoutEffect } from 'react'
import { getScrollBarSize, updateCSS, removeCSS } from '@/utils'

const UNIQUE_ID = `locker-${Date.now()}`

let uuid = 0

function isBodyOverflowing() {
	return (
		document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) &&
		window.innerWidth > document.body.offsetWidth
	)
}

export const useScrollLocker = (lock?: boolean) => {
	const mergedLock = !!lock
	const [id] = useState(() => {
		uuid += 1
		return `${UNIQUE_ID}_${uuid}`
	})

	useLayoutEffect(() => {
		if (mergedLock) {
			const scrollbarSize = getScrollBarSize()
			const isOverflow = isBodyOverflowing()

			updateCSS(
				`
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ''}
}`,
				id
			)
		} else {
			removeCSS(id)
		}

		return () => {
			removeCSS(id)
		}
	}, [mergedLock, id])
}
