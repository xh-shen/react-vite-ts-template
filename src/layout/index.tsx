/*
 * @Author: shen
 * @Date: 2022-09-29 09:06:24
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 20:13:16
 * @Description:
 */

import { Layout, BackTop } from 'antd'
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
	const { pathname } = useLocation()
	const prefixCls = usePrefixCls('layout')
	const primaryMenuKey = useAppSelector(state => state.app.primaryMenuKey)
	const { layout, showHeader, showSiderbar, showFooter, showTabs, fullContent } = useAppSetting()
	return (
		<>
			<div className={`${prefixCls} ${prefixCls}-${layout}`}>
				<Layout style={{ minHeight: '100%' }}>
					{layout === 'side' && showSiderbar && !fullContent ? <LayoutSider /> : null}
					{layout !== 'side' && showHeader && !fullContent ? <LayoutHeader /> : null}
					<Layout>
						{layout === 'side' && showHeader && !fullContent ? <LayoutHeader /> : null}
						{layout === 'mix' && showSiderbar && !fullContent && pathname !== primaryMenuKey ? <LayoutSider /> : null}
						<Layout>
							{showTabs ? <LayoutTabs /> : null}
							<LayoutContent />
							{showFooter ? <LayoutFooter /> : null}
						</Layout>
					</Layout>
				</Layout>
			</div>
			<BackTop visibilityHeight={100} />
			{config.enableSetting ? <LayoutSetting /> : null}
		</>
	)
}

export default BasicLayout
