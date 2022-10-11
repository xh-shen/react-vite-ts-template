/*
 * @Author: shen
 * @Date: 2022-09-27 16:53:41
 * @LastEditors: shen
 * @LastEditTime: 2022-10-11 08:02:25
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import Icon from '@ant-design/icons'
import type { FC, CSSProperties } from 'react'

import './index.less'

export interface SvgIconProps {
	name: string
	prefix?: string
	spin?: boolean
	rotate?: number
	style?: CSSProperties
	className?: string
}

const SvgIcon: FC<SvgIconProps> = ({ name, prefix = 'icon', ...props }) => {
	const prefixCls = usePrefixCls('svg-icon')
	const symbolId = `#${prefix}-${name}`
	const CustomIcon = () => (
		<svg aria-hidden="true" className={prefixCls}>
			<use href={symbolId} />
		</svg>
	)

	return <Icon component={CustomIcon} {...props} />
}

export default SvgIcon
