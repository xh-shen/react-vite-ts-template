/*
 * @Author: shen
 * @Date: 2022-09-28 14:56:34
 * @LastEditors: shen
 * @LastEditTime: 2022-09-28 15:47:48
 * @Description:
 */

import { useEffect, useState, useRef } from 'react'

export const useCountdown = (count: number, stopCount: number = 0) => {
	const [currentCount, setCurrentCount] = useState(count)
	const counter = useRef<number>(count)
	const [isStart, setIsStart] = useState(false)

	let timerId: ReturnType<typeof setInterval> | null

	useEffect(() => {
		return () => clear()
	}, [])

	// useEffect(() => {
	// 	setCurrentCount(counter.current)
	// }, [currentCount])

	const start = () => {
		if (isStart || !!timerId) {
			return
		}
		setIsStart(true)
		timerId = setInterval(() => {
			if (counter.current === stopCount) {
				stop()
				counter.current = count
			} else {
				counter.current = counter.current - 1
			}
			setCurrentCount(counter.current)
		}, 1000)
	}

	const stop = () => {
		setIsStart(false)
		clear()
		timerId = null
	}

	const clear = () => {
		timerId && window.clearInterval(timerId)
	}

	const reset = () => {
		setCurrentCount(count)
		counter.current = count
		stop()
	}

	const restart = () => {
		reset()
		start()
	}

	return { currentCount, isStart, start, reset, restart, clear, stop }
}
