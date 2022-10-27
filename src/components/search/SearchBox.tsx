/*
 * @Author: shen
 * @Date: 2022-10-27 08:21:14
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 16:34:17
 * @Description:
 */
import { useEffect, useRef, useState } from 'react'
import { Input } from 'antd'
import { useDebounceFn } from 'ahooks'
import { LoadingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { toPromise } from '@/utils'
import SvgIcon from '../svg-icon'

import type { FC, ChangeEvent } from 'react'
import type { InputRef } from 'antd'

export interface SearchBoxProps {
	open?: boolean
	prefixCls?: string
	placeholder?: string
	value?: string
	onChange?: (value?: string) => void
	onDebounceChange?: (value?: string) => void
}

const SearchBox: FC<SearchBoxProps> = ({ open, value, prefixCls, placeholder, onChange, onDebounceChange }) => {
	const inputRef = useRef<InputRef>(null)
	const { t } = useTranslation()
	const [keyword, setKeyword] = useState<string | undefined>(value)
	const [loading, setLoading] = useState<boolean>(false)

	const handleDebounceFn = async (value?: string) => {
		if (onDebounceChange) {
			setLoading(true)
			try {
				await toPromise(onDebounceChange(value))
			} finally {
				setLoading(false)
			}
		}
	}

	const { run } = useDebounceFn(handleDebounceFn, { wait: 300 })

	const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setKeyword(value)
		onChange?.(value)
		run(value)
	}
	useEffect(() => {
		if (open && inputRef.current) {
			inputRef.current.focus({
				cursor: 'end'
			})
		}
	}, [open])

	useEffect(() => {
		if (value) {
			setKeyword(value)
			onChange?.(value)
			handleDebounceFn(value)
		}
	}, [])

	return (
		<div className={`${prefixCls}-box`}>
			<Input
				ref={inputRef}
				value={keyword}
				size="large"
				placeholder={placeholder ?? t('components.search.placeholder')}
				allowClear
				prefix={loading ? <LoadingOutlined /> : <SvgIcon name="search2" />}
				onChange={onKeywordChange}
			/>
		</div>
	)
}

export default SearchBox
