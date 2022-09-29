/*
 * @Author: shen
 * @Date: 2022-09-29 09:06:24
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 10:48:01
 * @Description:
 */
import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
	return (
		<div>
			Layout
			<Outlet />
		</div>
	)
}

export default Layout
