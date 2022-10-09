/*
 * @Author: shen
 * @Date: 2022-09-27 16:53:41
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 09:49:34
 * @Description:
 */
import type { FC } from 'react'

import './index.less'

export type SvgIconProps = {
	name: string
	prefix?: string
	color?: string
}

const SvgIcon: FC<SvgIconProps> = ({ name, prefix = 'icon', color = '', ...props }) => {
	const symbolId = `#${prefix}-${name}`

	return (
		<svg {...props} aria-hidden="true" className="svg-icon">
			<use href={symbolId} fill={color} />
		</svg>
	)
}

export default SvgIcon
