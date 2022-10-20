/*
 * @Author: shen
 * @Date: 2022-10-19 08:07:43
 * @LastEditors: shen
 * @LastEditTime: 2022-10-20 14:51:27
 * @Description:
 */
import { useEffect, useRef } from 'react'
import { useThrottleFn } from 'ahooks'
import { createInstance, color, tooltip } from '@/charts'
import { getTargetElement } from '@/utils'

import type { EChartsOption, EChartsType } from '@/charts'
import type { BasicTarget } from '@/utils'
import { useResizeObserver } from '../use-resize-observer'

type Target = BasicTarget<HTMLElement>

export const useECharts = (
	target: Target,
	options?: EChartsOption,
	opts?: {
		notMerge?: boolean
		replaceMerge?: string | string[]
		lazyUpdate?: boolean
	}
): [instance: EChartsType | null, setOptions: Fn<EChartsOption, void>] => {
	const { notMerge, replaceMerge, lazyUpdate } = opts || {}
	const instance = useRef<EChartsType | null>(null)

	const setOptions = (options: EChartsOption) => {
		if (!instance.current) {
			return
		}
		if (options) {
			instance.current?.setOption(options, { notMerge, replaceMerge, lazyUpdate })
		}
	}

	const { run } = useThrottleFn(
		() => {
			instance.current?.resize()
		},
		{ wait: 100 }
	)

	useResizeObserver(run, target)

	useEffect(() => {
		const dom = getTargetElement(target)
		if (!dom) {
			return
		}
		instance.current = createInstance(dom)
		instance.current.setOption(
			{
				color,
				tooltip,
				...options
			},
			{ notMerge, replaceMerge, lazyUpdate }
		)
		return () => {
			instance.current?.dispose()
			instance.current = null
		}
	}, [])

	return [instance.current, setOptions]
}
