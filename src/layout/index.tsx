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
	const navigationMode = useAppSelector(state => state.app.navigationMode)

	return (
		<Layout className={prefixCls}>
			<LayoutSetting />
			{navigationMode === 'side' ? <LayoutSider /> : <LayoutHeader />}
			<Layout>
				{navigationMode === 'side' && <LayoutHeader />}
				{navigationMode === 'mix' && <LayoutSider />}
				<LayoutContent />
			</Layout>
		</Layout>
	)
}

export default BasicLayout
