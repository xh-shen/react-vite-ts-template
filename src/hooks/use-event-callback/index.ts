/*
 * @Author: shen
 * @Date: 2022-10-24 08:30:01
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 08:30:29
 * @Description:
 */
import { useCallback, useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'ahooks'

export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
	const ref: any = useRef(fn)

	useIsomorphicLayoutEffect(() => {
		ref.current = fn
	})

	return useCallback((...args: any[]) => ref.current.apply(void 0, args), []) as T
}
