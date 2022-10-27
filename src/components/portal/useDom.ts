/*
 * @Author: shen
 * @Date: 2022-10-26 09:08:22
 * @LastEditors: shen
 * @LastEditTime: 2022-10-26 09:15:43
 * @Description:
 */
import { useState, useLayoutEffect, useContext } from 'react'
import { canUseDom } from '@/utils'
import OrderContext from './Context'
import type { QueueCreate } from './Context'

const EMPTY_LIST = []

export default function useDom(render?: boolean, debug?: string): [HTMLDivElement, QueueCreate] {
	const [ele] = useState(() => {
		if (!canUseDom()) {
			return null
		}

		const defaultEle = document.createElement('div')

		if (process.env.NODE_ENV !== 'production' && debug) {
			defaultEle.setAttribute('data-debug', debug)
		}

		return defaultEle
	})

	const queueCreate = useContext(OrderContext)
	const [queue, setQueue] = useState<VoidFunction[]>(EMPTY_LIST)

	const mergedQueueCreate =
		queueCreate ||
		((appendFn: VoidFunction) => {
			setQueue(origin => {
				const newQueue = [appendFn, ...origin]
				return newQueue
			})
		})

	function append() {
		if (!ele!.parentElement) {
			document.body.appendChild(ele!)
		}
	}

	function cleanup() {
		ele!.parentElement?.removeChild(ele!)
	}

	useLayoutEffect(() => {
		if (render) {
			if (queueCreate) {
				queueCreate(append)
			} else {
				append()
			}
		} else {
			cleanup()
		}

		return cleanup
	}, [render])

	useLayoutEffect(() => {
		if (queue.length) {
			queue.forEach(appendFn => appendFn())
			setQueue(EMPTY_LIST)
		}
	}, [queue])

	return [ele!, mergedQueueCreate]
}
