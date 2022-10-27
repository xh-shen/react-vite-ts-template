/*
 * @Author: shen
 * @Date: 2022-10-26 07:56:38
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 15:55:53
 * @Description:
 */
import { useEffect, useState } from 'react'
import SearchBox from './SearchBox'
import SearchResult from './SearchResult'
import SearchEmpty from './SearchEmpty'
import SearchCommands from './SearchCommands'

import type { FC, KeyboardEventHandler } from 'react'
import type { SearchBoxProps } from './SearchBox'
import type { SearchResultProps } from './SearchResult'

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
		const { code } = event
		if (code === 'Escape') {
			onClose?.(event)
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
			<div className={`${prefixCls}-panel-container`}>
				{results.length > 0 ? <SearchResult {...searchStatePorops} /> : <SearchEmpty prefixCls={prefixCls} />}
			</div>
			<div className={`${prefixCls}-panel-footer`}>
				<SearchCommands prefixCls={prefixCls} />
			</div>
		</div>
	)
}

export default CustomSearchPanel
