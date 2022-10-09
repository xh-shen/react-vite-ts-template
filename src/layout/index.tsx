/*
 * @Author: shen
 * @Date: 2022-09-29 09:06:24
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 13:41:17
 * @Description:
 */

import { Layout } from 'antd'
import { usePrefixCls } from '@/hooks'
import LayoutHeader from './header'
import LayoutSider from './sider'
import LayoutContent from './content'
import './index.less'

import type { FC } from 'react'
import LayoutSetting from './setting'

const BasicLayout: FC = () => {
	const prefixCls = usePrefixCls('layout')

	return (
		<Layout className={prefixCls}>
			<LayoutSetting />
			<LayoutHeader />
			<Layout>
				<LayoutSider />
				<LayoutContent />
			</Layout>
		</Layout>
	)
}

export default BasicLayout
