/*
 * @Author: shen
 * @Date: 2022-09-22 10:03:06
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 10:03:23
 * @Description:
 */
import { Link, Outlet } from 'react-router-dom'

function Layout() {
	return (
		<div>
			<div>
				<Link to="/">首页</Link>
				<Link to="/about">关于</Link>
			</div>
			<Outlet />
		</div>
	)
}

export default Layout
