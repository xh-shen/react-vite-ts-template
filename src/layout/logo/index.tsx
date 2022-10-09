/*
 * @Author: shen
 * @Date: 2022-10-08 15:27:59
 * @LastEditors: shen
 * @LastEditTime: 2022-10-08 15:31:54
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import logoPic from '@/assets/images/logo.png'
import config from '@/config'

import type { FC } from 'react'
const Logo: FC = () => {
	const prefixCls = usePrefixCls('layout-logo')
	return (
		<div className={prefixCls}>
			<img className={`${prefixCls}-pic`} src={logoPic} />
			<span className={`${prefixCls}-name`}>{config.title}</span>
		</div>
	)
}

export default Logo
