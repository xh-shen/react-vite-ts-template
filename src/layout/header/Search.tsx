/*
 * @Author: shen
 * @Date: 2022-10-09 12:32:54
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 12:33:05
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import { SvgIcon } from '@/components'

import type { FC } from 'react'

const Search: FC = () => {
	const prefixCls = usePrefixCls('layout-action')
	return (
		<span className={`${prefixCls} ${prefixCls}-search`}>
			<SvgIcon name="search-line" />
		</span>
	)
}

export default Search
