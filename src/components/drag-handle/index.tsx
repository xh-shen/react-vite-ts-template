/*
 * @Author: shen
 * @Date: 2022-10-14 10:20:49
 * @LastEditors: shen
 * @LastEditTime: 2022-10-14 16:53:37
 * @Description:
 */
import { useState, useRef, useEffect } from 'react'
import { usePrefixCls } from '@/hooks'
import { on, off, raf, RafFrame } from '@/utils'
import classNames from 'classnames'
import './index.less'

import type { FC, CSSProperties } from 'react'

export interface DragHandleProps {
	width: number
	minWidth?: number
	maxWidth?: number
	style?: CSSProperties
	className?: string
	onStop?: (current: number) => void
}

const DragHandle: FC<DragHandleProps> = ({ width, minWidth, maxWidth, onStop }) => {
	let dragRef = useRef<HTMLDivElement>(null)
	let finalWidth = useRef<number>(width)
	const prefixCls = usePrefixCls('drag-handle')
	const [draging, setDraging] = useState(false)
	const [current, setCurrent] = useState(width)

	const className = classNames(prefixCls, {
		[`${prefixCls}-draging`]: draging
	})

	const removeEvents = () => {
		off(window, 'mouseup', handleMouseUp as any)
		off(window, 'mousemove', handleMouseMove as any)
		document.onselectstart = null
	}

	let startX = 0
	let finalValue = 0
	let rafFrame: RafFrame
	const handleMouseDown = (e: MouseEvent) => {
		if (e.ctrlKey || e.button === 2) {
			return
		}
		removeEvents()
		startX = e.clientX
		setDraging(true)
		e.stopImmediatePropagation()
		on(window, 'mousemove', handleMouseMove as any)
		on(window, 'mouseup', handleMouseUp as any)
		document.onselectstart = () => false
	}

	const handleMouseUp = (e: MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()
		setDraging(false)
		finalWidth.current = finalValue
		onStop?.(finalWidth.current)
		removeEvents()
	}

	const handleMouseMove = (e: MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()
		const deltaX = startX - e.clientX
		let w = Math.max(finalWidth.current - deltaX, minWidth || 0)
		if (maxWidth) {
			w = Math.min(w, maxWidth)
		}
		finalValue = w
		raf.cancel(rafFrame)
		rafFrame = raf(() => {
			setCurrent(w)
		})
	}

	useEffect(() => {
		if (dragRef.current) {
			on(dragRef.current, 'mousedown', handleMouseDown as any)
		}
		return () => removeEvents()
	}, [])

	return (
		<div ref={dragRef} className={className} style={{ left: current + 'px' }}>
			<div className={`${prefixCls}-line`}></div>
		</div>
	)
}

export default DragHandle
