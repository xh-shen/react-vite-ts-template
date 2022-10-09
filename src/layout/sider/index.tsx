/*
 * @Author: shen
 * @Date: 2022-10-08 09:19:47
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 08:22:26
 * @Description:
 */
import { Layout } from 'antd'
import { usePrefixCls } from '@/hooks'
import type { FC } from 'react'

const { Sider } = Layout

const LayoutSider: FC = () => {
	const prefixCls = usePrefixCls('layout-sider')
	return (
		<Sider theme="light" className={prefixCls}>
			sider
		</Sider>
	)
}

export default LayoutSider
