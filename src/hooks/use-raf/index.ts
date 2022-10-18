/*
 * @Author: shen
 * @Date: 2022-10-17 16:12:22
 * @LastEditors: shen
 * @LastEditTime: 2022-10-18 13:52:48
 * @Description:
 */

import raf from '@/utils/raf'
import { useRef, useEffect, useState } from 'react'

export function useRaf<Callback extends Function>(callback: Callback) {
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

type Callback<T> = (ori: T) => T

export function useRafState<T>(defaultState: T | (() => T)): [T, (updater: Callback<T>) => void] {
	const batchRef = useRef<Callback<T>[]>([])
	const [, forceUpdate] = useState({})
	const state = useRef<T>(typeof defaultState === 'function' ? (defaultState as any)() : defaultState)

	const flushUpdate = useRaf(() => {
		let current = state.current
		batchRef.current.forEach(callback => {
			current = callback(current)
		})
		batchRef.current = []

		state.current = current
		forceUpdate({})
	})

	function updater(callback: Callback<T>) {
		batchRef.current.push(callback)
		flushUpdate()
	}

	return [state.current, updater]
}
