/*
 * @Author: shen
 * @Date: 2022-10-17 16:12:22
 * @LastEditors: shen
 * @LastEditTime: 2022-10-17 16:14:00
 * @Description:
 */

import raf from '@/utils/raf'
import { useRef, useEffect } from 'react'

export default function useRaf<Callback extends Function>(callback: Callback) {
	const rafRef = useRef<number>()
	const removedRef = useRef(false)

	function trigger(...args: any[]) {
		if (!removedRef.current) {
			raf.cancel(rafRef.current as number)
			rafRef.current = raf(() => {
				callback(...args)
			})
		}
	}

	useEffect(() => {
		//be compatible with react 18 StrictMode in dev
		removedRef.current = false

		return () => {
			removedRef.current = true
			raf.cancel(rafRef.current as number)
		}
	}, [])

	return trigger
}
