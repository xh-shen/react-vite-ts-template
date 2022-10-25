/*
 * @Author: shen
 * @Date: 2022-09-29 09:06:24
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 09:05:34
 * @Description:
 */

import { Layout } from 'antd'
import { useAppSetting, usePrefixCls } from '@/hooks'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store'
import config from '@/config'
import LayoutSetting from './setting'
import LayoutHeader from './header'
import LayoutSider from './sider'
import LayoutContent from './content'
import LayoutFooter from './footer'
import LayoutTabs from './tabs'
import './index.less'

import type { FC } from 'react'

const BasicLayout: FC = () => {
	const prefixCls = usePrefixCls('layout')
	const { pathname } = useLocation()
	const primaryMenuKey = useAppSelector(state => state.app.primaryMenuKey)
	const { layout, showHeader, showSiderbar, showFooter, showTabs, fullContent } = useAppSetting()
	return (
		<div className={`${prefixCls} ${prefixCls}-${layout}`}>
			<Layout style={{ minHeight: '100%' }}>
				{config.enableSetting && <LayoutSetting />}
				{layout === 'side' && showSiderbar && !fullContent && <LayoutSider />}
				{layout !== 'side' && showHeader && !fullContent && <LayoutHeader />}
				<Layout>
					{layout === 'side' && showHeader && !fullContent && <LayoutHeader />}
					{layout === 'mix' && showSiderbar && !fullContent && pathname !== primaryMenuKey && <LayoutSider />}
					<Layout>
						{showTabs && <LayoutTabs />}
						<LayoutContent />
						{showFooter && <LayoutFooter />}
					</Layout>
				</Layout>
			</Layout>
		</div>
	)
}

export default BasicLayout
