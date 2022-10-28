/*
 * @Author: shen
 * @Date: 2022-10-26 07:56:38
 * @LastEditors: shen
 * @LastEditTime: 2022-10-28 12:43:58
 * @Description:
 */
import { useEffect, useState, useRef } from 'react'
import SearchBox from './SearchBox'
import SearchResult from './SearchResult'
import SearchEmpty from './SearchEmpty'
import SearchCommands from './SearchCommands'

import type { FC, KeyboardEventHandler } from 'react'
import type { SearchBoxProps } from './SearchBox'
import type { SearchResultProps, SearchResultRef } from './SearchResult'

export interface SearchPanelProps extends Omit<SearchBoxProps, 'prefixCls'>, Omit<SearchResultProps, 'prefixCls' | 'stateList'> {
	prefixCls?: string
	dataSource: any[]
}

const CustomSearchPanel: FC<SearchPanelProps> = ({
	open,
	value,
	prefixCls,
	placeholder,
	renderItem,
	dataSource,
	onChange,
	onSelect,
	onDebounceChange,
	onClose
}) => {
	const resultRef = useRef<SearchResultRef>(null)
	const [results, setResults] = useState<any[]>([])
	const searchBoxPorops = {
		open,
		value,
		prefixCls,
		placeholder,
		onChange,
		onDebounceChange
	}

	const searchStatePorops = {
		open,
		prefixCls,
		renderItem,
		results,
		onSelect,
		onClose
	}

	const onPanelKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
		event.stopPropagation()
		const { code } = event
		if (code === 'Escape') {
			onClose?.(event)
		}
		if (code === 'ArrowUp' || code === 'ArrowDown') {
			event.preventDefault()
			resultRef.current?.onKeyDownArrowUpOrDown(code)
		}
		if (code === 'Enter') {
			resultRef.current?.onKeyDownEnter(event)
		}
	}

	useEffect(() => {
		if (dataSource && dataSource.length > 0) {
			setResults(dataSource)
		} else {
			setResults([])
		}
	}, [dataSource])

	return (
		<div className={`${prefixCls}-panel`} onKeyDown={onPanelKeyDown}>
			<SearchBox {...searchBoxPorops} />
			{results.length > 0 ? <SearchResult ref={resultRef} {...searchStatePorops} /> : <SearchEmpty prefixCls={prefixCls} />}
			<div className={`${prefixCls}-panel-footer`}>
				<SearchCommands prefixCls={prefixCls} />
			</div>
		</div>
	)
}

export default CustomSearchPanel
