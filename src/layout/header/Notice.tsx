/*
 * @Author: shen
 * @Date: 2022-10-09 12:05:30
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 12:30:32
 * @Description:
 */
import { Badge } from 'antd'
import { usePrefixCls } from '@/hooks'
import { SvgIcon } from '@/components'

import type { FC } from 'react'

const Notice: FC = () => {
	const prefixCls = usePrefixCls('layout-action')
	return (
		<span className={`${prefixCls} ${prefixCls}-notice`}>
			<Badge count={11}>
				<span className="notice">
					<SvgIcon name="notice-line" />
				</span>
			</Badge>
		</span>
	)
}

export default Notice
