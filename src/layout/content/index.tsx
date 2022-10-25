/*
 * @Author: shen
 * @Date: 2022-10-08 09:11:40
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 14:22:28
 * @Description:
 */
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { usePrefixCls } from '@/hooks'
import type { FC } from 'react'

const { Content } = Layout

const LayoutContent: FC = () => {
	const prefixCls = usePrefixCls('layout-content')
	return (
		<Content className={prefixCls} style={{ padding: 16 }}>
			<Outlet />
		</Content>
	)
}

export default LayoutContent
