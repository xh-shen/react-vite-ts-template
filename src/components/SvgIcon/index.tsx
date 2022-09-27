/*
 * @Author: shen
 * @Date: 2022-09-27 16:53:41
 * @LastEditors: shen
 * @LastEditTime: 2022-09-27 17:02:54
 * @Description:
 */
import type { FC } from 'react'

import './index.less'

type Props = {
	name: string
	prefix?: string
	color?: string
}

const SvgIcon: FC<Props> = ({ name, prefix = 'icon', color = '#333', ...props }) => {
	const symbolId = `#${prefix}-${name}`

	return (
		<svg {...props} aria-hidden="true" className="svg-icon">
			<use href={symbolId} fill={color} />
		</svg>
	)
}

export default SvgIcon
