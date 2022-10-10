/*
 * @Author: shen
 * @Date: 2022-10-08 15:27:59
 * @LastEditors: shen
 * @LastEditTime: 2022-10-10 15:00:32
 * @Description:
 */
import logoPic from '@/assets/images/logo.png'
import config from '@/config'

import type { FC } from 'react'
const Logo: FC = () => {
	return (
		<a>
			<img src={logoPic} />
			<h1>{config.title}</h1>
		</a>
	)
}

export default Logo
