/*
 * @Author: shen
 * @Date: 2022-10-09 15:11:08
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 11:48:32
 * @Description:
 */
import { useMemo } from 'react'
import { Tooltip } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import type { FC } from 'react'

export type BlockCheckboxProps = {
	value: string
	onChange: (key: string) => void
	list?: {
		title: string
		key: string
	}[]
	prefixCls: string
}

const BlockCheckbox: FC<BlockCheckboxProps> = ({ list, value, prefixCls, onChange }) => {
	const baseClassName = `${prefixCls}-block-checkbox`

	const onSelect = (key: string) => {
		if (value === key) {
			return
		}
		onChange(key)
	}

	const dom = useMemo(() => {
		const domList = (list || []).map(item => (
			<Tooltip title={item.title} key={item.key}>
				<div className={`${baseClassName}-item ${baseClassName}-item-${item.key}`} onClick={() => onSelect(item.key)}>
					<CheckOutlined
						className={`${baseClassName}-item-select`}
						style={{
							display: value === item.key ? 'block' : 'none'
						}}
					/>
				</div>
			</Tooltip>
		))
		return domList
	}, [value, list?.length, onChange])

	return <div className={baseClassName}>{dom}</div>
}

export default BlockCheckbox
