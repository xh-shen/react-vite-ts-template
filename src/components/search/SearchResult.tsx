/*
 * @Author: shen
 * @Date: 2022-10-27 08:47:21
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 16:08:35
 * @Description:
 */
import { useEffect, useState, useRef } from 'react'
import { isFunction } from '@/utils'
import { useKeyPress } from 'ahooks'
import SvgIcon from '../svg-icon'

import type { FC, ReactNode, MouseEvent, KeyboardEvent } from 'react'

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

const SearchState: FC<SearchResultProps> = ({
	open,
	prefixCls,
	results = [],
	expandIcon,
	fieldNames,
	renderItem,
	onSelect,
	onClose
}) => {
	const resultRef = useRef<HTMLDivElement>(null)
	const [selectedKey, setSelectedKey] = useState<string | number>()

	const renderIcon = (item: any) => {
		if (expandIcon) {
			return isFunction(expandIcon) ? expandIcon(selectedKey!, item) : expandIcon
		}
		return <SvgIcon name="doc" />
	}

	const onItemMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
		const value = (e.target as HTMLDivElement).dataset.value
		if (value === selectedKey) {
			return
		}
		setSelectedKey(value)
	}

	const onResultKeyDown = (type: 'up' | 'down') => {
		let nextIndex = 0
		let index = results.findIndex(item => item[fieldNames?.value || 'value'] === selectedKey)
		index = index === -1 ? 0 : index
		if (type === 'up') {
			nextIndex = index === 0 ? results.length - 1 : index - 1
		} else {
			nextIndex = index === results.length - 1 ? 0 : index + 1
		}
		setSelectedKey(results[nextIndex]?.[fieldNames?.value || 'value'])
	}

	useKeyPress('uparrow', () => {
		if (open && results.length > 1) {
			onResultKeyDown('up')
		}
	})

	useKeyPress('downarrow', () => {
		if (open && results.length > 1) {
			onResultKeyDown('down')
		}
	})

	useKeyPress('enter', (e: any) => {
		if (open && selectedKey) {
			onSelect?.(selectedKey!)
			onClose?.(e)
		}
	})

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
	return (
		<div className={`${prefixCls}-result`} ref={resultRef}>
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
	)
}

export default SearchState
