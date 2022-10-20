/*
 * @Author: shen
 * @Date: 2022-10-19 16:25:36
 * @LastEditors: shen
 * @LastEditTime: 2022-10-19 19:48:44
 * @Description:
 */
import { useEffect, useRef } from 'react'
import { stringify } from '@/utils'
import { createInstance, color, tooltip } from '@/charts'
import ResizeObserver from 'rc-resize-observer'

import type { EChartsOption, EChartsType } from '@/charts'
export type { EChartsOption, EChartsType }

export interface EChartProps<T = any> {
	height?: number | string
	data?: T[]
	options: EChartsOption
	notMerge?: boolean
	replaceMerge?: string | string[]
	lazyUpdate?: boolean
	onResize?: Fn
	getInstance?: Fn<EChartsType, void>
}

function EChart<T>({ height, options, data, notMerge, replaceMerge, lazyUpdate, getInstance, onResize }: EChartProps<T>) {
	const instance = useRef<EChartsType | null>(null)
	const domRef = useRef<HTMLDivElement>(null)

	const onListHolderResize = () => {
		instance.current?.resize()
		onResize?.()
	}

	useEffect(() => {
		if (options) {
			instance.current?.setOption(options || {}, { notMerge, replaceMerge, lazyUpdate })
		}
	}, [stringify(options)])

	useEffect(() => {
		if (data) {
			instance.current?.setOption({
				dataset: {
					source: data
				}
			})
		}
	}, [stringify(data || [])])

	useEffect(() => {
		instance.current = createInstance(domRef.current!)
		instance.current.setOption(
			{
				color,
				tooltip,
				...options,
				dataset: data
					? {
							source: data
					  }
					: {}
			},
			{ notMerge, replaceMerge, lazyUpdate }
		)
		getInstance?.(instance.current)
		return () => {
			instance.current?.dispose()
			instance.current = null
		}
	}, [])

	return (
		<ResizeObserver onResize={onListHolderResize}>
			<div ref={domRef} style={{ width: '100%', height: height || '300px' }}></div>
		</ResizeObserver>
	)
}

export default EChart