/*
 * @Author: shen
 * @Date: 2022-10-27 08:47:21
 * @LastEditors: shen
 * @LastEditTime: 2022-10-28 16:00:03
 * @Description:
 */
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { isFunction, on, off } from '@/utils'
import SvgIcon from '../svg-icon'

import type { ForwardRefRenderFunction, ReactNode, MouseEvent, KeyboardEvent } from 'react'

export interface SearchResultProps {
	prefixCls?: string
	open?: boolean
	results?: any[]
	expandIcon?: ReactNode | ((selectedKey: string | number, item: any) => ReactNode)
	fieldNames?: {
		title: string
		value: string
	}
	renderItem?: (item: any) => ReactNode
	onSelect?: (value: string | number) => void
	onClose?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void
}

export interface SearchResultRef {
	onKeyDownArrowUpOrDown: (type: 'ArrowUp' | 'ArrowDown') => void
	onKeyDownEnter: (event: KeyboardEvent<HTMLElement>) => void
}

const SearchResult: ForwardRefRenderFunction<SearchResultRef, SearchResultProps> = (
	{ open, prefixCls, results = [], expandIcon, fieldNames, renderItem, onSelect, onClose },
	ref
) => {
	const isMouseEvent = useRef<boolean>(true)
	const resultRef = useRef<HTMLDivElement>(null)
	const [selectedKey, setSelectedKey] = useState<string | number>()

	const renderIcon = (item: any) => {
		if (expandIcon) {
			return isFunction(expandIcon) ? expandIcon(selectedKey!, item) : expandIcon
		}
		return <SvgIcon name="doc" />
	}

	const onMouseMove = () => {
		isMouseEvent.current = true
		off(window, 'mousemove', onMouseMove)
	}

	const onItemMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
		if (!isMouseEvent.current) {
			return
		}
		const value = (e.target as HTMLDivElement).dataset.value
		if (value === selectedKey) {
			return
		}
		setSelectedKey(value)
	}

	const scrollToIndex = index => {
		if (index === 0) {
			resultRef.current!.scrollTop = 0
			return
		}
		if (index === results.length - 1) {
			const resultWrap = resultRef.current!.querySelector<HTMLElement>(`.${prefixCls}-result-container`)!
			resultRef.current!.scrollTop = resultWrap.scrollHeight - resultRef.current!.clientHeight
			return
		}
		const resultList = resultRef.current!.querySelectorAll<HTMLElement>(`.${prefixCls}-result-item`)!
		const highlightItem = resultList[index]
		const scrollTop = resultRef.current!.scrollTop
		const { offsetTop, scrollHeight } = highlightItem
		if (offsetTop + scrollHeight > scrollTop + resultRef.current!.clientHeight) {
			resultRef.current!.scrollTop += scrollHeight + 4
		}
		if (offsetTop < scrollTop) {
			resultRef.current!.scrollTop -= scrollHeight + 4
		}
	}

	const onKeyDownArrowUpOrDown = (type: 'ArrowUp' | 'ArrowDown') => {
		if (!selectedKey) {
			return
		}
		if (isMouseEvent.current) {
			on(window, 'mousemove', onMouseMove)
		}
		isMouseEvent.current = false

		let nextIndex = 0
		let index = results.findIndex(item => item[fieldNames?.value || 'value'] === selectedKey)
		index = index === -1 ? 0 : index
		if (type === 'ArrowUp') {
			nextIndex = index === 0 ? results.length - 1 : index - 1
		} else {
			nextIndex = index === results.length - 1 ? 0 : index + 1
		}
		setSelectedKey(results[nextIndex]?.[fieldNames?.value || 'value'])
		scrollToIndex(nextIndex)
	}

	const onKeyDownEnter = (event: KeyboardEvent<HTMLElement>) => {
		if (open && selectedKey) {
			onSelect?.(selectedKey!)
			onClose?.(event)
		}
	}

	useImperativeHandle(ref, () => ({
		onKeyDownArrowUpOrDown,
		onKeyDownEnter
	}))

	const onItemSelect = e => {
		onSelect?.(selectedKey!)
		onClose?.(e)
	}
	useEffect(() => {
		if (results.length > 0) {
			setSelectedKey(results[0][fieldNames?.value || 'value'])
		} else {
			setSelectedKey(undefined)
		}
	}, [results])
	useEffect(() => {
		if (!open) {
			off(window, 'mousemove', onMouseMove)
		}
	}, [open])

	useEffect(() => () => off(window, 'mousemove', onMouseMove), [])

	return (
		<div className={`${prefixCls}-result`} ref={resultRef}>
			<div className={`${prefixCls}-result-container`}>
				{results.map((item, index) => (
					<div
						className={`${prefixCls}-result-item ${selectedKey === item[fieldNames?.value || 'value'] ? 'selected' : ''}`}
						key={item.value}
						data-index={index}
						data-value={item.value}
						onClick={onItemSelect}
						onMouseEnter={onItemMouseEnter}
					>
						{renderItem ? (
							renderItem(item)
						) : (
							<>
								<div className={`${prefixCls}-result-item-icon`}>{renderIcon(item)}</div>
								<div className={`${prefixCls}-result-item-wrapper`}>{item[fieldNames?.title || 'title']}</div>
								<div className={`${prefixCls}-result-item-action`}>
									<svg width="20" height="20" viewBox="0 0 20 20">
										<g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
											<path d="M18 3v4c0 2-2 4-4 4H2"></path>
											<path d="M8 17l-6-6 6-6"></path>
										</g>
									</svg>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default forwardRef<SearchResultRef, SearchResultProps>(SearchResult)
