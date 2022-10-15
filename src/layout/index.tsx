/*
 * @Author: shen
 * @Date: 2022-09-29 09:06:24
 * @LastEditors: shen
 * @LastEditTime: 2022-10-15 17:53:36
 * @Description:
 */

import { Layout } from 'antd'
import { useAppSetting, usePrefixCls } from '@/hooks'
import LayoutSetting from './setting'
import LayoutHeader from './header'
import LayoutSider from './sider'
import LayoutContent from './content'
import './index.less'

import type { FC } from 'react'

const BasicLayout: FC = () => {
	const prefixCls = usePrefixCls('layout')
	const { layout, showHeader, showSiderbar, fullContent } = useAppSetting()

	return (
		<div className={`${prefixCls} ${prefixCls}-${layout}`}>
			<Layout style={{ minHeight: '100%' }}>
				<LayoutSetting />
				{layout === 'side' && showSiderbar && !fullContent && <LayoutSider />}
				{layout !== 'side' && showHeader && !fullContent && <LayoutHeader />}
				<Layout>
					{layout === 'side' && showHeader && !fullContent && <LayoutHeader />}
					{layout === 'mix' && showSiderbar && !fullContent && <LayoutSider />}
					<LayoutContent />
				</Layout>
			</Layout>
		</div>
	)
}

export default BasicLayout
