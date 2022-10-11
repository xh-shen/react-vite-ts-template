/*
 * @Author: shen
 * @Date: 2022-09-29 09:06:24
 * @LastEditors: shen
 * @LastEditTime: 2022-10-10 13:23:16
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
import { useAppSelector } from '@/store'

const BasicLayout: FC = () => {
	const prefixCls = usePrefixCls('layout')
	const layout = useAppSelector(state => state.app.layout)

	return (
		<Layout className={prefixCls}>
			<LayoutSetting />
			{layout === 'side' ? <LayoutSider /> : <LayoutHeader />}
			<Layout>
				{layout === 'side' && <LayoutHeader />}
				{layout === 'mix' && <LayoutSider />}
				<LayoutContent />
			</Layout>
		</Layout>
	)
}

export default BasicLayout
